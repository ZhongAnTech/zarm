import { ReactNode } from 'react';
export default interface PropsType {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  autoClose?: boolean;
  stayTime?: number;
  animationDuration?: number;
  onOpen?: () => void;
  onClose?: () => void;
  mask?: boolean;
  maskType?: 'transparent' | 'normal';
  onMaskClick?: () => void;
  willUnMount?: () => void;
  handlePortalUnmount?: (container?: ReactNode) => void;
}
