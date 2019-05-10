export default interface TabBasePropsType {
  tabWidth?:  number;
  // tabHeight?: number;
  lineWidth?:number;
  scrollElastic?: boolean;   //tab弹性滑动
  disabled?: boolean;   
  hasline?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  value?:number;
  defaultValue?:number;
  page?: number;   //不使用分页时生效
  horizontal?:  boolean;
  useTabPaged?:boolean;

}
