export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  onMaskClick?: () => void;
}

declare global {
  interface Window {
    zarmToast?: any;
  }
}
