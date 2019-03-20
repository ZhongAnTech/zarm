export default interface TabBasePropsType {
  tabWidth?:  number;
  tabHeight?: number;
  lineWidth?:number;
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
