import { ReactNode } from 'react';

export type direction =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom';

export default interface PropsType {
  prefixCls?: string;
  className?: string;
  trigger?: 'click' | 'hover';
  visible?: boolean;
  direction: direction;
  onVisibleChange?: (visible?: boolean) => void;
  title?: () => void | ReactNode ;
}
