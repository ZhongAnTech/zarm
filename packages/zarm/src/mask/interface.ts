import type { ContainerType } from '../utils/dom';

export interface BaseMaskProps {
  visible?: boolean;
  color?: 'black' | 'white' | 'transparent';
  opacity?: 'normal' | 'light' | 'dark' | number;
  forceRender?: boolean;
  destroy?: boolean;
  mountContainer?: ContainerType;
}
