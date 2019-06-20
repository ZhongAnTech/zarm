export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}

declare global {
  interface Window {
    zarmToast?: any;
  }
}
