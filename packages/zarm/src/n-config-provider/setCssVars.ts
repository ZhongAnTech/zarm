import * as React from 'react';
// import { paramCase } from 'change-case';

const defaultCssVars = {};

// const optionsToVars = (options) => {
//   Object.keys(options).forEach((key) => {
//     console.log(paramCase(key))
//   });
// }

const setCssVars = (children, cssVars) => {
  const newChildren = children as React.DetailedReactHTMLElement<any, HTMLElement>;
  if (!cssVars) return children;

  return React.cloneElement(newChildren, {
    style: { ...newChildren.props.style, ...cssVars },
  });
};

export type CssVars = typeof defaultCssVars;

export { defaultCssVars };
export default setCssVars;
