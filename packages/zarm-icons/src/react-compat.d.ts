/* eslint-disable react/no-typos */
import 'react';

declare module 'react' {
  interface ForwardRefExoticComponent<P> {
    defaultProps?: Partial<P>;
  }
}
