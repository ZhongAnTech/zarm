import * as React from 'react';

export interface BaseGridProps {
  /**
   * 列数
   * @default 4
   */
  columns?: number;
  /**
   * 格子之间的间距
   * @default 0
   */
  gutter?: number | [number, number];
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 是否将格子固定为正方形
   * @default false
   */
  square?: boolean;
  children?: React.ReactNode;
}
