import { ReactNode } from 'react';

export interface BaseCarouselProps {
  direction?: 'vertical' | 'horizontal';
  height?: string | number;
  loop?: boolean;
  activeIndex?: number;
  animationDuration?: number;
  swipeable?: boolean;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  showPagination?: boolean;
  onChange?: (activeIndex: number) => void;
  onChangeEnd?: (activeIndex: number) => void;
  children?: ReactNode[];
}
