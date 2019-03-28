export default interface TabBasePropsType {
  tabWidth?:  number;
  tabHeight?: number;
  lineWidth?:number;
  scrollElastic?: boolean;   //tab弹性滑动
  disabled?: boolean;
  hasline?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  defaultValue?:number;
  page?: number;
  horizontal?:  boolean;
  useTabPaged?:boolean;

}
