import React from "react";
import { IconProps } from "@chakra-ui/react";
import Icon from "./Icon";

export function Bars({
  className,
  ...rest
}: IconProps & { className?: string }) {
  return (
    <Icon className={className} {...rest}>
      <path
        d="M2 5.07143C2 4.47991 2.47991 4 3.07143 4H20.9286C21.5223 4 22 4.47991 22 5.07143C22 5.66518 21.5223 6.14286 20.9286 6.14286H3.07143C2.47991 6.14286 2 5.66518 2 5.07143ZM2 12.2143C2 11.6205 2.47991 11.1429 3.07143 11.1429H20.9286C21.5223 11.1429 22 11.6205 22 12.2143C22 12.808 21.5223 13.2857 20.9286 13.2857H3.07143C2.47991 13.2857 2 12.808 2 12.2143ZM20.9286 20.4286H3.07143C2.47991 20.4286 2 19.9509 2 19.3571C2 18.7634 2.47991 18.2857 3.07143 18.2857H20.9286C21.5223 18.2857 22 18.7634 22 19.3571C22 19.9509 21.5223 20.4286 20.9286 20.4286Z"
        fill="black"
      />
    </Icon>
  );
}

export default Bars;