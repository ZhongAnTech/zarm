import * as React from 'react';

export interface BaseTabsProps {
  value?: number;
  defaultValue?: number;
  lineWidth?: string | number;
  disabled?: boolean;
  swipeable?: boolean;
  scrollable?: boolean;
  direction?: 'vertical' | 'horizontal' | 'top' | 'right' | 'bottom' | 'left'; // TODO: 'vertical'、'horizontal' 暂作兼容
  onChange?: (index: number) => void;
  children?: React.ReactNode;
}

export interface BaseTabPanelProps {
  selected?: boolean;
  disabled?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
}
