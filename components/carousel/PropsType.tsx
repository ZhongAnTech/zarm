import { ReactNode } from 'react';

export default interface PropsType {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  height?: string | number;
  loop?: boolean;
  activeIndex?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  showPagination?: boolean;
  onChange?: (activeIndex: number) => void;
  onChangeEnd?: (activeIndex: number) => void;
  children: ReactNode[];
}
