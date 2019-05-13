export default interface TabBasePropsType {
  prefixCls?:string;
  activeKey?:number;
  tabWidth?:  number;
  // tabHeight?: number;
  lineWidth?:number;
  scrollElastic?: boolean;   //tab弹性滑动
  disabled?: boolean;   
  hasline?: boolean;
  swipeable?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  defaultActiveKey?:number;
  page?: number;   //不使用分页时生效
  horizontal?:  boolean;
  useTabPaged?:boolean;

}
