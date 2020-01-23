type getContainerFunc = () => HTMLElement;

export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  getContainer?: HTMLElement | getContainerFunc;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
