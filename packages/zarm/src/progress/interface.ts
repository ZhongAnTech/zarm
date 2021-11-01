import type { ReactNode } from 'react';

export type KnownSize = 'lg' | 'md' | 'sm';
export type ProgressTheme = 'primary' | 'success' | 'warning' | 'danger';
export type ProgressSize = KnownSize | number | string;
export type ProgressShape = 'line' | 'circle' | 'semi-circle';
export type ProgressStrokeShape = 'round' | 'rect';
export type ProgressPercent = number;
export type PercentFormatter = (percent: number) => ReactNode;
export type WeightMap = {
  [weight in KnownSize]: number;
};

export interface BaseProgressProps {
  // 进度条主题
  theme?: ProgressTheme;

  // 进度条形状
  shape?: ProgressShape;

  // 进度条大小
  size?: ProgressSize;

  // 进度百分比
  percent?: ProgressPercent;

  // 进度条线的形状
  strokeShape?: ProgressStrokeShape;

  // 进度条线宽
  strokeWidth?: number;

  // 进度信息
  text?: PercentFormatter;
}
