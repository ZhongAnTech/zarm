import React from 'react';

export default interface PropsType {
  direction: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  animationDuration?: number;
  animationDelay?: number;
  style?: React.CSSProperties;
}
