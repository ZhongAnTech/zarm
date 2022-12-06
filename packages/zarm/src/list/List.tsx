import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { BaseListProps } from './interface';
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
  '--item-suffix-text-color'?: React.CSSProperties['color'];
  '--item-space'?: string | number;
  '--item-arrow-border-width'?: React.CSSProperties['borderWidth'];
  '--item-arrow-color'?: React.CSSProperties['color'];
  '--item-arrow-size'?: string | number;
  '--item-description-font-size'?: React.CSSProperties['fontSize'];
  '--item-description-text-color'?: React.CSSProperties['color'];
  '--item-description-line-height'?: React.CSSProperties['lineHeight'];
  '--item-inline-title-width'?: React.CSSProperties['width'];
}

export type ListProps = React.PropsWithChildren<BaseListProps & HTMLProps<ListCssVars>>;

const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { className, bordered, children, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('list', { prefixCls });
  const cls = bem([
    {
      unbordered: !bordered,
    },
    className,
  ]);

  return (
    <ul ref={ref} className={cls} {...restProps}>
      {children}
    </ul>
  );
});

List.displayName = 'List';

List.defaultProps = {
  bordered: true,
};

export default List;
