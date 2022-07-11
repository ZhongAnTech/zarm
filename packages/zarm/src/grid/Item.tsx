import * as React from 'react';
import classnames from 'classnames';
import GridContext from './GridContext';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export type GridItemProps = HTMLProps & {
  onClick?: React.MouseEventHandler;
};

const GridItem: React.FC<GridItemProps> = (props) => {
  const { className, style, onClick, children } = props;
  const { columns, gutter, bordered, square } = React.useContext(GridContext);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-grid-item`;

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

  const classes = classnames(
    prefixCls,
    {
      [`${prefixCls}--clickable`]: !!onClick,
      [`${prefixCls}--horizontal-bordered`]: bordered && horizontalGutter,
      [`${prefixCls}--vertical-bordered`]: bordered && verticalGutter,
    },
    className,
  );

  return (
    <div className={classes} style={{ ...mergedStyle, ...style }} onClick={onClick}>
      <div className={`${prefixCls}__content`}>{children}</div>
    </div>
  );
};

export default GridItem;
