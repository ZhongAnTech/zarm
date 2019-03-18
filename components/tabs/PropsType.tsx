export default interface PropsType {
  lineWidth?: string | number;
  disabled?: boolean;
  hasline?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
  page?: number;
  // useTabPaged?:boolean;

}
