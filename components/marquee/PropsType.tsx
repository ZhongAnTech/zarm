import React from 'react';

export interface PropsType {
  direction: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  scrollAmount?: number;
  scrollDelay?: number;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}
