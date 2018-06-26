export type Action = {
  text: string,
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error',
  className?: string,
  onClick?: () => void,
};

export default interface PropsType {
  visible?: boolean;
  shape?: 'radius';
  spacing?: boolean;
  actions: Action[];
  cancelText?: string;
  onMaskClick?: () => void;
  onCancel?: () => void;
}
