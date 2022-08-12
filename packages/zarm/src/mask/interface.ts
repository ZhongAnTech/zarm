import type { MountContainer } from '../utils/dom';
import type { BaseTransitionProps } from '../transition/interface';

export interface BaseMaskProps extends BaseTransitionProps {
  color?: 'black' | 'white' | 'transparent';
  opacity?: 'normal' | 'light' | 'dark' | number;
  animationDuration?: number;
  mountContainer?: MountContainer;
}
