import { BaseCascaderViewProps, CascaderValue, CascaderItem } from '../cascader-view/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseCascaderProps extends BaseCascaderViewProps {
  title?: string;
  visible?: boolean;
  maskClosable?: boolean;
  cancelText?: string;
  confirmText?: string;
  mountContainer?: MountContainer;
  onConfirm?: (value: CascaderValue[], items: CascaderItem[]) => void;
  onCancel?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
}
