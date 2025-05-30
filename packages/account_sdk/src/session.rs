use cainome::cairo_serde::{CairoSerde, NonZero};
use starknet::accounts::ConnectedAccount;
use starknet::core::types::{Call, FeeEstimate, Felt, InvokeTransactionResult};
use starknet::signers::{SigningKey, VerifyingKey};

use crate::abigen::controller::{Signer as AbigenSigner, SignerSignature, StarknetSigner};
use crate::account::session::account::SessionAccount;
use crate::account::session::hash::Session;
use crate::account::session::policy::Policy;
use crate::controller::Controller;
use crate::errors::ControllerError;
use crate::hash::MessageHashRev1;
use crate::signers::{HashSigner, Signer};
use crate::storage::StorageBackend;
use crate::storage::{selectors::Selectors, Credentials, SessionMetadata};

#[cfg(all(test, not(target_arch = "wasm32")))]
#[path = "session_test.rs"]
mod session_test;

impl Controller {
    pub async fn create_session(
        &mut self,
        methods: Vec<Policy>,
        expires_at: u64,
    ) -> Result<SessionAccount, ControllerError> {
        self.create_session_with_guardian(methods, expires_at, Felt::ZERO)
            .await
    }

    pub async fn create_session_with_guardian(
        &mut self,
        methods: Vec<Policy>,
        expires_at: u64,
        guardian: Felt,
    ) -> Result<SessionAccount, ControllerError> {
        let signer = SigningKey::from_random();
        let session_signer = Signer::Starknet(signer.clone());

        let session = Session::new(
            methods,
            expires_at,
            &session_signer.clone().into(),
            guardian,
        )?;

        self.create_with_session(signer, session).await
    }

    pub async fn create_wildcard_session(
        &mut self,
        expires_at: u64,
    ) -> Result<SessionAccount, ControllerError> {
        let signer = SigningKey::from_random();
        let session_signer = Signer::Starknet(signer.clone());

        let session =
            Session::new_wildcard(expires_at, &session_signer.clone().into(), Felt::ZERO)?;

        self.create_with_session(signer, session).await
    }

    pub async fn create_with_session(
        &mut self,
        session_signer: SigningKey,
        session: Session,
    ) -> Result<SessionAccount, ControllerError> {
        let hash = session
            .inner
            .get_message_hash_rev_1(self.chain_id, self.address);
        let authorization = self.owner.sign(&hash).await?;
        let authorization = Vec::<SignerSignature>::cairo_serialize(&vec![authorization.clone()]);
        self.storage.set_session(
            &Selectors::session(&self.address, &self.app_id, &self.chain_id),
            SessionMetadata {
                session: session.clone(),
                max_fee: None,
                credentials: Some(Credentials {
                    authorization: authorization.clone(),
                    private_key: session_signer.secret_scalar(),
                }),
                is_registered: false,
            },
        )?;

        let session_account = SessionAccount::new(
            self.provider().clone(),
            Signer::Starknet(session_signer),
            self.address,
            self.chain_id,
            authorization,
            session,
        );

        Ok(session_account)
    }

    pub fn register_session_call(
        &mut self,
        policies: Vec<Policy>,
        expires_at: u64,
        public_key: Felt,
        guardian: Felt,
    ) -> Result<Call, ControllerError> {
        let pubkey = VerifyingKey::from_scalar(public_key);
        let signer = AbigenSigner::Starknet(StarknetSigner {
            pubkey: NonZero::new(pubkey.scalar()).unwrap(),
        });
        let session = Session::new(policies, expires_at, &signer, guardian)?;
        let call = self
            .contract()
            .register_session_getcall(&session.into(), &self.owner_guid());

        Ok(call)
    }

    pub async fn register_session(
        &mut self,
        policies: Vec<Policy>,
        expires_at: u64,
        public_key: Felt,
        guardian: Felt,
        max_fee: Option<FeeEstimate>,
    ) -> Result<InvokeTransactionResult, ControllerError> {
        let session = Session::new(
            policies,
            expires_at,
            &AbigenSigner::Starknet(StarknetSigner {
                pubkey: NonZero::new(public_key).unwrap(),
            }),
            guardian,
        )?;

        let call = self
            .contract()
            .register_session_getcall(&session.clone().into(), &self.owner_guid());
        let txn = self.execute(vec![call], max_fee, None).await?;

        self.storage.set_session(
            &Selectors::session(&self.address, &self.app_id, &self.chain_id),
            SessionMetadata {
                session,
                max_fee: None,
                credentials: None,
                is_registered: true,
            },
        )?;

        Ok(txn)
    }

    pub fn authorized_session(&self) -> Option<SessionMetadata> {
        let key = self.session_key();
        let session = self.storage.session(&key).ok().flatten()?;

        // Check if the session is expired
        if session.session.is_expired() {
            // Session is expired, return None
            return None;
        }

        Some(session)
    }

    pub fn authorized_session_for_policies(
        &self,
        policies: &[Policy],
        public_key: Option<Felt>,
    ) -> Option<SessionMetadata> {
        let key = self.session_key();
        self.storage
            .session(&key)
            .ok()
            .flatten()
            .filter(|metadata| metadata.is_authorized(policies, public_key))
    }

    pub fn is_requested_session(&self, policies: &[Policy], public_key: Option<Felt>) -> bool {
        let key = self.session_key();
        self.storage
            .session(&key)
            .ok()
            .flatten()
            .filter(|metadata| metadata.is_requested(policies, public_key))
            .is_some()
    }

    pub fn session_key(&self) -> String {
        Selectors::session(&self.address, &self.app_id, &self.chain_id)
    }

    pub fn session_account(&self, policies: &[Policy]) -> Option<SessionAccount> {
        // Return None if any policy contains a call to the controller's own address
        if policies.iter().any(|policy| match policy {
            Policy::Call(contract_policy) => contract_policy.contract_address == self.address,
            _ => false,
        }) {
            return None;
        }

        // Check if there's a valid session stored
        let metadata = self.authorized_session_for_policies(policies, None)?;
        let credentials = metadata.credentials.as_ref()?;
        let session_signer =
            Signer::Starknet(SigningKey::from_secret_scalar(credentials.private_key));
        let session_account = SessionAccount::new(
            self.provider().clone(),
            session_signer,
            self.address,
            self.chain_id,
            credentials.authorization.clone(),
            metadata.session,
        );

        Some(session_account)
    }
}
