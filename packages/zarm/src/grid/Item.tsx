import * as React from 'react';
import classnames from 'classnames';
import GridContext from './GridContext';
import { ConfigContext } from '../n-config-provider';

interface GridItemProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const GridItem: React.FC<GridItemProps> = (props) => {
  const { className, style, onClick, children } = props;
  const { columns, gutter, bordered, square } = React.useContext(GridContext);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-grid-item`;

  const classes = classnames(
    prefixCls,
    {
      [`${prefixCls}--square`]: square,
    },
    className,
  );

  const percent = `${100 / +columns!}%`;

  const mergedStyle: React.CSSProperties = {
    flexBasis: percent,
    paddingTop: square ? percent : undefined,
  };

  let horizontalGutter;
  let verticalGutter;

  if (gutter && gutter[0] > 0) {
    horizontalGutter = gutter[0] / 2;
    mergedStyle.paddingLeft = horizontalGutter;
    mergedStyle.paddingRight = horizontalGutter;
  }

  if (gutter && gutter[1] > 0) {
    verticalGutter = gutter[1] / 2;
    mergedStyle.paddingTop = verticalGutter;
    mergedStyle.paddingBottom = verticalGutter;
  }

  const contextClasses = classnames(`${prefixCls}__content`, {
    [`${prefixCls}__content--clickable`]: !!onClick,
    [`${prefixCls}__content--horizontal-bordered`]: bordered && horizontalGutter,
    [`${prefixCls}__content--vertical-bordered`]: bordered && verticalGutter,
  });

  return (
    <div className={classes} style={{ ...mergedStyle, ...style }} onClick={onClick}>
      <div className={contextClasses}>{children}</div>
    </div>
  );
};

export default GridItem;
