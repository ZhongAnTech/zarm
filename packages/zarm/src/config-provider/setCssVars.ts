import * as React from 'react';
import type { ConfigProviderProps } from './interface';

const setCssVars = (children: React.ReactNode, cssVars: ConfigProviderProps['cssVars']) => {
  if (!cssVars || Object.keys(cssVars).length === 0 || !React.isValidElement(children)) {
    return children;
  }

  if (typeof children.type === 'string') {
    const child = children as React.ReactElement<any>;

    return React.cloneElement(child, {
      style: {
        ...child.props.style,
        ...cssVars,
      },
    });
  }

  return React.createElement('span', { style: { display: 'contents', ...cssVars } }, children);
};

export default setCssVars;
