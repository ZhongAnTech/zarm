import React, { HTMLAttributes } from 'react';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
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
