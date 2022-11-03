import { BaseCascaderViewProps } from '../cascader-view/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseCascaderProps extends Omit<BaseCascaderViewProps, 'onChange'> {
  title?: string;
  visible?: boolean;
  maskClosable?: boolean;
  cancelText?: string;
  confirmText?: string;
  mountContainer?: MountContainer;
  onChange?: (selected: string[]) => void;
  onConfirm?: (value: string[]) => void;
  onCancel?: () => void;
}
