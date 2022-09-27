import React from "react";
import { Icon, useStyleConfig } from "@chakra-ui/react";

const Layer = (props: any) => {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("Icon", { variant, size });

  return (
    <Icon viewBox="0 0 11 12" fill="currentColor" __css={styles} {...rest}>
      <path d="M5.10526 0.000345423C5.04057 0.00362681 4.97776 0.0233154 4.92292 0.0580037L0.18324 3.02294C0.0730796 3.09138 0.00604176 3.21185 0.00604176 3.3417C0.00604176 3.47154 0.0730748 3.59201 0.18324 3.66045L4.92292 6.62443C5.04479 6.70084 5.19949 6.70084 5.32137 6.62443L10.0601 3.66045H10.0606C10.1707 3.59201 10.2377 3.47154 10.2377 3.3417C10.2377 3.21185 10.1707 3.09138 10.0606 3.02294L5.32135 0.0580037C5.25713 0.0172216 5.18166 -0.00293549 5.10525 0.000345423H5.10526ZM5.12214 0.816936L9.15307 3.3417L5.12214 5.86646L1.09168 3.3417L5.12214 0.816936ZM0.3689 5.90535C0.202959 5.91003 0.060454 6.02347 0.0173246 6.18332C-0.0253332 6.34364 0.042169 6.51287 0.183266 6.59959L4.92294 9.56729C5.04482 9.6437 5.19952 9.6437 5.32139 9.56729L10.0606 6.59959C10.2298 6.48709 10.279 6.25974 10.1707 6.0877C10.0629 5.9152 9.83746 5.85989 9.66214 5.96301L5.12215 8.8065L0.581676 5.96301C0.518393 5.92269 0.443863 5.90254 0.368861 5.90535L0.3689 5.90535ZM0.3689 8.28058C0.201087 8.2834 0.0557618 8.39731 0.0126324 8.55903C-0.0304946 8.72123 0.0393525 8.89232 0.183266 8.97811L4.92294 11.943C5.04482 12.019 5.19952 12.019 5.32139 11.943L10.0606 8.97811C10.2298 8.86513 10.279 8.63826 10.1707 8.46575C10.0629 8.29324 9.83746 8.2384 9.66214 8.34152L5.12215 11.1842L0.581676 8.34152C0.518393 8.30027 0.444331 8.27871 0.368861 8.28058L0.3689 8.28058Z" />
    </Icon>
  );
};

export default Layer;