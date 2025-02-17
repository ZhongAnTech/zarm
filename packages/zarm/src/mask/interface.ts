import type { BaseTransitionProps } from '../transition/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseMaskProps extends BaseTransitionProps {
  color?: 'black' | 'white' | 'transparent';
  opacity?: 'normal' | 'light' | 'dark' | number;
  animationDuration?: number;
  mountContainer?: MountContainer;
  afterOpen?: () => void;
  afterClose?: () => void;
}
