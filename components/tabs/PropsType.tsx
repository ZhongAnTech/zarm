export default interface TabBasePropsType {
  tabWidth?:  number;
  tabHeight?: number;
  lineWidth?:number;
  disabled?: boolean;
  hasline?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  page?: number;
  horizontal?: string;
  useTabPaged?:boolean;

}
