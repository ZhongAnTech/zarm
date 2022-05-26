import * as React from 'react';
import type { Locale } from '../n-config-provider/interface';
import type { ButtonSize, ButtonShape } from '../button/interface';

export interface BaseSwipeActionItemProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  onClick?: () => void;
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
  locale?: Locale['SwipeAction'];
}
