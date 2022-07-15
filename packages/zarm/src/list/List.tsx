import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ListCssVars {
  '--item-height'?: React.CSSProperties['height'];
  '--item-padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--item-padding-vertical'?: React.CSSProperties['paddingTop'];
  '--item-background'?: React.CSSProperties['background'];
  '--item-active-background'?: React.CSSProperties['background'];
  '--item-separator-color'?: React.CSSProperties['color'];
  '--item-title-font-size'?: React.CSSProperties['fontSize'];
  '--item-title-white-space'?: React.CSSProperties['whiteSpace'];
  '--item-title-line-height'?: React.CSSProperties['lineHeight'];
  '--item-after-text-color'?: React.CSSProperties['color'];
  '--item-space'?: string | number;
  '--item-arrow-border-width'?: React.CSSProperties['borderWidth'];
  '--item-arrow-color'?: React.CSSProperties['color'];
  '--item-arrow-size'?: string | number;
  '--item-info-font-size'?: React.CSSProperties['fontSize'];
  '--item-info-text-color'?: React.CSSProperties['color'];
  '--item-info-line-height'?: React.CSSProperties['lineHeight'];
  '--item-inline-title-width'?: React.CSSProperties['width'];
}

export type ListProps = React.PropsWithChildren<HTMLProps<ListCssVars>>;

const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('list', { prefixCls });
  const cls = bem([className]);

  return (
    <ul ref={ref} className={cls} {...restProps}>
      {children}
    </ul>
  );
});

List.displayName = 'List';

List.defaultProps = {};

export default List;
