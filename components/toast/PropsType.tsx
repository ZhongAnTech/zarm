export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
