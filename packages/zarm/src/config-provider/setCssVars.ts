import * as React from 'react';
import type { ConfigProviderProps } from './interface';

const setCssVars = (children: React.ReactNode, cssVars: ConfigProviderProps['cssVars']) => {
  if (!cssVars) return children;

  return React.cloneElement(children as React.DetailedReactHTMLElement<any, HTMLElement>, {
    style: {
      ...(children as React.DetailedReactHTMLElement<any, HTMLElement>).props.style,
      ...cssVars,
    },
  });
};

export default setCssVars;
