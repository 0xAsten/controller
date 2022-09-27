import React from "react";
import { IconProps } from "@chakra-ui/react";
import Icon from "./Icon";

export function Fire({
  className,
  ...rest
}: IconProps & { className?: string }) {
  return (
    <Icon className={className} {...rest}>
      <path
        d="M15.6367 4.00195C14.8281 4.75391 14.0938 5.54492 13.4453 6.33984C12.3789 4.87578 11.0547 3.38672 9.5625 2C5.72461 5.55938 3 10.2031 3 13C3 17.9727 6.91406 22 11.75 22C16.5859 22 20.5 17.9727 20.5 13C20.5 10.9219 18.4688 6.62891 15.6367 4.00195ZM14.8789 17.3086C14.0312 17.8984 12.9922 18.25 11.8633 18.25C9.0457 18.25 6.75 16.3855 6.75 13.3594C6.75 11.8504 7.69688 10.5219 9.59141 8.25C9.86484 8.5625 13.4539 13.1484 13.4539 13.1484L15.7441 10.5359C15.9053 10.7996 16.0514 11.0641 16.1832 11.3133C17.2539 13.3516 16.8047 15.9609 14.8789 17.3086Z"
        fill="black"
      />
    </Icon>
  );
}

export default Fire;