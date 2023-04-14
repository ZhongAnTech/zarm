import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import GridContext from './GridContext';

export type GridItemProps = HTMLProps & {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const GridItem: React.FC<GridItemProps> = (props) => {
  const { className, style, onClick, children } = props;
  const { columns, gutter, bordered, square } = React.useContext(GridContext);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('grid-item', { prefixCls });

  const percent = `${100 / +columns!}%`;

  const mergedStyle: React.CSSProperties = {
    flexBasis: percent,
    paddingTop: square ? percent : undefined,
  };

  let horizontalGutter;
  let verticalGutter;

  if (!square && gutter && gutter[0] > 0) {
    horizontalGutter = gutter[0] / 2;
    mergedStyle.paddingTop = horizontalGutter;
    mergedStyle.paddingBottom = horizontalGutter;
  }

  if (!square && gutter && gutter[1] > 0) {
    verticalGutter = gutter[1] / 2;
    mergedStyle.paddingLeft = verticalGutter;
    mergedStyle.paddingRight = verticalGutter;
  }

  console.log(bordered && horizontalGutter, bordered && verticalGutter);

  const cls = bem([{
    clickable: !!onClick,
    'horizontal-bordered': bordered && horizontalGutter > 0,
    'vertical-bordered': bordered && verticalGutter > 0,
  }, className]);

  return (
    <div className={cls} style={{ ...mergedStyle, ...style }} onClick={onClick}>
      <div className={bem('content')}>{children}</div>
    </div>
  );
};

export default GridItem;
