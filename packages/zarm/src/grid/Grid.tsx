import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import GridContext from './GridContext';
import type { BaseGridProps } from './interface';

export interface GridCssVars {
  '--border-color'?: React.CSSProperties['borderColor'];
  '--item-background'?: React.CSSProperties['background'];
  '--item-active-background'?: React.CSSProperties['background'];
}

export type GridProps = BaseGridProps & HTMLProps<GridCssVars>;

const Grid: React.FC<GridProps> = (props) => {
  const { className, style, columns, gutter, bordered, square, children } = props;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('grid', { prefixCls });

  const gutters: [number, number] = Array.isArray(gutter) ? gutter : [gutter!, gutter!];

  const gridContext = React.useMemo(
    () => ({ columns, gutter: gutters, bordered, square }),
    [columns, gutters, bordered, square],
  );

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

  const classes = bem([
    {
      bordered,
      square,
    },
    className,
  ]);

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
