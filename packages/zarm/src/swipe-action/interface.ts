import * as React from 'react';

export interface BaseSwipeActionItemProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled: boolean;
  onClick?: () => void;
}

export interface BaseSwipeActionProps {
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  animationDuration?: number;
  offset?: number;
  autoClose?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
