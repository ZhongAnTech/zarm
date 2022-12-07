import { ReactNode } from 'react';
import type { MountContainer } from '../utils/dom';

export interface BaseToastProps {
  visible?: boolean;
  stayTime?: number;
  content?: ReactNode;
  mountContainer?: MountContainer;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
