import { forwardRef, memo } from "react";
import { iconVariants } from "../utils";
import { IconProps } from "../types";

export const ControllerIcon = memo(
  forwardRef<SVGSVGElement, IconProps>(
    ({ className, size, ...props }, forwardedRef) => (
      <svg
        viewBox="0 0 160 160"
        className={iconVariants({ size, className })}
        ref={forwardedRef}
        {...props}
      >
        <path
          d="M71.8859 14.7749H88.1131V33.4516H71.8859V14.7749Z"
          className="fill-current"
        />
        <path
          d="M48.2884 129.258H18.0263C16.0317 129.258 16.0317 127.252 16.0317 127.252V51.4059C16.0317 51.4059 16.0317 49.4193 18.0263 49.4193H71.8859L71.8859 33.4516H52.0844C52.0844 33.4516 48.0764 33.4516 44.0685 35.4382L6.00256 51.4059C1.99464 53.3926 0 57.4031 0 61.3764V125.247C0 127.252 0 129.239 1.99464 131.244L14.0184 143.22C16.013 145.225 17.523 145.225 20.021 145.225H48.293C48.2949 140.372 48.2971 134.638 48.299 129.368H110.991V145.225H139.979C142.477 145.225 143.987 145.225 145.982 143.22L158.005 131.244C160 129.258 160 127.252 160 125.247V61.3764C160 57.3845 158.005 53.3926 153.997 51.4059L115.931 35.4382C111.924 33.4516 107.916 33.4516 107.916 33.4516H88.1131L88.1131 49.4193H141.992C143.987 49.4193 143.987 51.4059 143.987 51.4059V127.252C143.987 127.252 143.987 129.258 141.992 129.258H111.051V113.514H48.3041C48.3041 115.041 48.29 127.922 48.2884 129.258Z"
          className="fill-current"
        />
        <path
          d="M48.2883 89.008H111.051V73.1533H48.3041C48.3041 74.7732 48.2883 89.1571 48.2883 89.008Z" fill="#FBCB4A"
          className="fill-current"
        />
      </svg>
    ),
  ),
);

ControllerIcon.displayName = "ControllerIcon";