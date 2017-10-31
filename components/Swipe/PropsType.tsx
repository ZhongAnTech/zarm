interface BaseProps {
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
  children?: any;
}

export interface SwipeProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
