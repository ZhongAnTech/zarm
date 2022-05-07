import * as React from 'react';
// import type { Locale } from '../n-config-provider/interface';

export interface BaseSwipeActionItemProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled: boolean;
  autoClose?: boolean;
  bold?: boolean;
  shape?: string;
  size?: string;
  onClose?: () => void;
  onClick?: () => void;
  // locale?: Locale['SwiperAction'];
}

export interface BaseSwipeActionProps {
  leftAction?: BaseSwipeActionItemProps[];
  rightActon?: BaseSwipeActionItemProps[];
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  animationDuration?: number;
  offset?: number;
  autoClose?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  // locale?: Locale['SwiperAction'];
}
