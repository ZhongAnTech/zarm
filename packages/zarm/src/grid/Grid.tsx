import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import GridContext from './GridContext';
import type { BaseGridProps } from './interface';
import type { CSSVariables } from '../utils/types';

export type GridCSSVariables = CSSVariables<{
  /** 宫格边框颜色 */
  '--border-color': React.CSSProperties['borderColor'];
  /** 宫格背景颜色 */
  '--background-color': React.CSSProperties['backgroundColor'];
}>;

export interface GridProps extends BaseGridProps {
  /** 组件样式名 */
  className?: string;
  /** 组件样式 */
  style?: GridCSSVariables;
}

const Grid: React.FC<GridProps> = (props) => {
  const { className, style, columns = 4, gutter = 0, bordered = true, square, children } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-grid`;

  const gutters: [number, number] = Array.isArray(gutter) ? gutter : [gutter, gutter];

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
    gridStyle.paddingLeft = horizontalGutter;
    gridStyle.paddingRight = horizontalGutter;
  }

  if (!square && verticalGutter) {
    gridStyle.paddingTop = verticalGutter;
    gridStyle.paddingBottom = verticalGutter;
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

export default Grid;
