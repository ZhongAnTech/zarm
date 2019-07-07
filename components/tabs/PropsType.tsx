export default interface TabBasePropsType {
  prefixCls?: string;
  activeKey?: number;
  tabWidth?: number;
  // scrollElastic?: boolean;    // tab弹性滑动
  scrollThreshold?: number;
  swipeable?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  defaultActiveKey?: number;
  direction?: string;
}
