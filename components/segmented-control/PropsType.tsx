import React from 'react';

export interface BaseSegmentedControlProps {
  selectIndex?: number;
  block?: boolean;
  shape?: 'radius' | 'rect' | 'round';
  disabled?: boolean;
  items: string[];
  onChange?: (selectIndex: number) => void;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}
