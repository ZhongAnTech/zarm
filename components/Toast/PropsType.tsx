export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  onClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}

declare global {
  interface Window {
    zarmToast?: any;
  }
}
