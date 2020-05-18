import { ReactNode } from 'react';
import { ContainerType } from '../popup/PropsType';

export default interface PropsType {
  visible?: boolean;
  stayTime?: number;
  content?: ReactNode;
  getContainer?: ContainerType;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
