export default interface PropsType {
  value?: number;
  defaultValue?: number;
  lineWidth?: string | number;
  disabled?: boolean;
  swipeable?: boolean;
  scrollable?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (index?: number) => void;
}
