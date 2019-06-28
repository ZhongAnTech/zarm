export default interface TabBasePropsType {
  prefixCls?: string;
  activeKey?: number;
  tabWidth?: number;
  lineWidth?: number;
  scrollElastic?: boolean;    // tab弹性滑动
  hasline?: boolean;
  swipeable?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  defaultActiveKey?: number;
  page?: number;
  horizontal?: boolean;
  useTabPaged?: boolean;
}
