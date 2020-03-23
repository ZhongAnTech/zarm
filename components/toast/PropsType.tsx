import { ReactNode } from 'react';

type getContainerFunc = () => HTMLElement;

export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  content?: ReactNode;
  getContainer?: HTMLElement | getContainerFunc;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
