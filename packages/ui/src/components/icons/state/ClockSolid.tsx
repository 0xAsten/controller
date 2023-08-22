import { memo } from "react";
import { Icon, IconProps } from "@chakra-ui/react";

export const ClockSolidIcon = memo((props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8Zm-.75-12.25V12c0 .25.125.484.334.625l3 2a.748.748 0 0 0 1.041-.21.748.748 0 0 0-.21-1.04L12.75 11.6V7.75A.748.748 0 0 0 12 7a.748.748 0 0 0-.75.75Z"
    />
  </Icon>
));