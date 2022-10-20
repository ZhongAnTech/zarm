import { ForwardRefExoticComponent, RefAttributes } from "react";

export const withStaticProps = <P, S, T>(
  forwarded: ForwardRefExoticComponent<P & RefAttributes<T>>,
  staticProps: S
) => Object.assign(forwarded, staticProps)
