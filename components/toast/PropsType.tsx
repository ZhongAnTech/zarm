import { ReactNode } from 'react';
import { ContainerType } from '../utils/dom';

export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  content?: ReactNode;
  mountContainer?: ContainerType;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
