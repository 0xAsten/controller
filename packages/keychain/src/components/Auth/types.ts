import { Connect } from "pages";
import { constants } from "starknet";
import Controller from "utils/controller";

export type FormValues = {
  username: string;
};

export type AuthProps = SignupProps | LoginProps;

type AuthBaseProps = {
  fullPage?: boolean;
  prefilledName?: string;
  context?: Connect;
  onController?: (controller: Controller) => void | Promise<void>;
  onComplete?: () => void;
  // onCancel?: () => void;
};

export type SignupProps = AuthBaseProps & {
  starterPackId?: string;
  onLogin: (username: string) => void;
};

export type LoginProps = AuthBaseProps & {
  chainId?: constants.StarknetChainId;
  onSignup: (username: string) => void;
};