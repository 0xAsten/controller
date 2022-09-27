import React from "react";
import { IconProps } from "@chakra-ui/react";
import Icon from "./Icon";

export function Favorite({
  favorite,
  className,
  ...rest
}: IconProps & { favorite?: boolean; className?: string }) {
  return (
    <Icon className={className} {...rest}>
      {favorite ? (
        <path
          fill="#FBCB4A"
          d="M16 2.66667H14.7435V1.35593H13.5288V1.31073V0H9.84293V1.35593H8.62827V2.66667H7.37173V1.35593H6.11518V1.31073V0H2.4712V1.35593H1.21466V2.66667H0V7.9548H1.21466V8V9.31073H2.4712V10.6215H3.68586V10.6667V11.9774H4.90052V13.2881H6.15707V14.5989H7.37173V16H8.58639V14.6441V14.5989H9.84293V13.2881H11.0576V11.9774H12.2723V10.6667V10.6215H13.5288V9.31073H14.7435V7.9548H16V2.66667Z"
        ></path>
      ) : (
        <path
          fill="white"
          d="M6.15707 14.5989V13.2881H7.37173V14.5989H6.15707ZM3.68586 11.9774H4.90052V10.6667H3.68586C3.68586 10.6667 3.68586 11.9774 3.68586 11.9774ZM3.68586 9.31073H2.4712V10.6215H3.68586C3.68586 10.6215 3.68586 9.31073 3.68586 9.31073ZM1.21466 2.66667H2.42932V1.35593H1.21466V2.66667ZM9.84293 1.35593H8.62827V2.66667H9.84293V1.35593ZM0 7.9548H1.21466V2.66667H0V7.9548ZM6.15707 1.31073V0H2.4712V1.31073C2.4712 1.31073 6.15707 1.31073 6.15707 1.31073ZM7.37173 16H8.58639V14.6441H7.37173V16ZM1.21466 9.31073H2.42932V8H1.21466V9.31073ZM4.94241 11.9774V13.2881H6.15707V11.9774H4.94241ZM13.5707 9.31073H14.7853V8H13.5707V9.31073ZM7.37173 3.9774H8.58639V2.66667H7.37173V3.9774ZM11.0995 11.9774H12.3141V10.6667H11.0995V11.9774ZM13.5707 1.35593V2.66667H14.7853V1.35593H13.5707ZM14.7853 2.66667V7.9548H16V2.66667H14.7853ZM12.3141 10.6215H13.5707V9.31073H12.3141V10.6215ZM6.15707 1.35593V2.66667H7.37173V1.35593C7.37173 1.35593 6.15707 1.35593 6.15707 1.35593ZM13.5707 1.31073V0H9.84293V1.31073C9.84293 1.31073 13.5707 1.31073 13.5707 1.31073ZM8.62827 14.5989H9.84293V13.2881H8.62827V14.5989ZM9.84293 13.2881H11.0576V11.9774H9.84293V13.2881V13.2881Z"
        ></path>
      )}
    </Icon>
  );
}

export default Favorite;