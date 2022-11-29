import { BaseCascaderViewProps, CascaderValue } from '../cascader-view/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseCascaderProps extends BaseCascaderViewProps {
  title?: string;
  visible?: boolean;
  maskClosable?: boolean;
  cancelText?: string;
  confirmText?: string;
  mountContainer?: MountContainer;
  onConfirm?: (value?: CascaderValue[]) => void;
  onCancel?: () => void;
}
