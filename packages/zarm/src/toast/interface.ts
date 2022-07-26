import { ReactNode } from 'react';
import type { GetContainer } from '../utils/dom';

export interface BaseToastProps {
  visible?: boolean;
  stayTime?: number;
  content?: ReactNode;
  mountContainer?: GetContainer;
  afterClose?: () => void;
  mask?: boolean;
  onMaskClick?: () => void;
}
