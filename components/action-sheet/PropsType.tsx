export type Action = {
  text: string,
  theme?: 'default' | 'primary' | 'danger',
  className?: string,
  onClick?: () => void,
};

export default interface PropsType {
  visible?: boolean;
  shape?: 'rect' | 'radius';
  spacing?: boolean;
  actions: Action[];
  cancelText?: string;
  onMaskClick?: () => void;
  onCancel?: () => void;
}
