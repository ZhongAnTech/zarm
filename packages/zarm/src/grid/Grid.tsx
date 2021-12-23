import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import GridContext from './GridContext';
import type { BaseGridProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface GridCssVars {
  '--za-grid-border-color'?: React.CSSProperties['borderColor'];
  '--za-grid-item-background'?: React.CSSProperties['background'];
  '--za-grid-item-active-background'?: React.CSSProperties['background'];
}

export type GridProps = BaseGridProps & HTMLProps;

const Grid: React.FC<GridProps> = (props) => {
  const { className, style, columns, gutter, bordered, square, children } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-grid`;

  const gutters: [number, number] = Array.isArray(gutter) ? gutter : [gutter!, gutter!];

  const gridContext = React.useMemo(() => ({ columns, gutter: gutters, bordered, square }), [
    columns,
    gutters,
    bordered,
    square,
  ]);

  const gridStyle: React.CSSProperties = {};
  const horizontalGutter = gutters[0] > 0 ? gutters[0] / 2 : undefined;
  const verticalGutter = gutters[1] > 0 ? gutters[1] / 2 : undefined;

  if (!square && horizontalGutter) {
    gridStyle.paddingTop = horizontalGutter;
    gridStyle.paddingBottom = horizontalGutter;
  }

  if (!square && verticalGutter) {
    gridStyle.paddingLeft = verticalGutter;
    gridStyle.paddingRight = verticalGutter;
  }

  const classes = classnames(
    prefixCls,
    {
      [`${prefixCls}--bordered`]: bordered,
      [`${prefixCls}--square`]: square,
    },
    className,
  );

  return (
    <GridContext.Provider value={gridContext}>
      <div className={classes} style={{ ...gridStyle, ...style }}>
        {children}
      </div>
    </GridContext.Provider>
  );
};

Grid.displayName = 'Grid';

Grid.defaultProps = {
  columns: 3,
  gutter: 0,
  bordered: true,
};

export default Grid;
