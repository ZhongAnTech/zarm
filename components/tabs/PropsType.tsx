export default interface PropsType {
  value?: number;
  defaultValue?: number;
  scrollThreshold: number;
  lineWidth?: string | number;
  disabled?: boolean;
  canSwipe?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (index?: number) => void;
}
