import * as React from 'react';
// import { paramCase } from 'change-case';

interface ZarmCssVars {
  '--za-action-sheet-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-action-sheet-spacing-margin'?: React.CSSProperties['margin'];
  '--za-action-sheet-item-background'?: React.CSSProperties['background'];
  '--za-action-sheet-item-active-background'?: React.CSSProperties['background'];
  '--za-action-sheet-item-height'?: React.CSSProperties['height'];
  '--za-action-sheet-item-color'?: React.CSSProperties['color'];
  '--za-action-sheet-item-font-size'?: React.CSSProperties['fontSize'];
  '--za-action-sheet-cancel-background'?: React.CSSProperties['background'];
  '--za-action-sheet-cancel-color'?: React.CSSProperties['color'];
  '--za-action-sheet-cancel-margin-top'?: React.CSSProperties['marginTop'];
}
const defaultCssVars: ZarmCssVars = {};

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
