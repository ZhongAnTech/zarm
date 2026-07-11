/* eslint-disable react/no-typos */
import 'react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    /**
     * Kept in the type surface while Zarm migrates defaults into component
     * implementations. React 19 no longer applies this property at runtime.
     */
    defaultProps?: Partial<P>;
  }

  interface ForwardRefExoticComponent<P> {
    defaultProps?: Partial<P>;
  }
}
