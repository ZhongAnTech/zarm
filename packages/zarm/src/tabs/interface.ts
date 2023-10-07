import * as React from 'react';

export interface BaseTabsProps {
  value?: string | number;
  defaultValue?: number;
  lineWidth?: string | number;
  disabled?: boolean;
  swipeable?: boolean;
  scrollable?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (index: number) => void;
  children?: React.ReactNode;
}

export interface BaseTabPanelProps {
  disabled?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  value?: string | number;
}

export interface TabsCssVars {
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
  '--color-disabled'?: React.CSSProperties['color'];
  '--height'?: React.CSSProperties['height'];
  '--active-color'?: React.CSSProperties['color'];
  '--active-line-height'?: React.CSSProperties['height'];
  '--padding-horizontal'?: React.CSSProperties['left'];
  '--padding-vertical'?: React.CSSProperties['top'];
}
