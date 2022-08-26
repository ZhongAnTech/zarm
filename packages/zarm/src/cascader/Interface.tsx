import { BaseCascaderViewProps } from 'src/cascader-view/Interface';
import type { MountContainer } from '../utils/dom';

export interface BaseCascaderProps extends Omit<BaseCascaderViewProps, 'onChange'> {
  title?: string;
  visible?: boolean;
  maskClosable?: boolean;
  cancelText?: string;
  okText?: string;
  mountContainer?: MountContainer;
  onChange?: (selected: string[]) => void;
  onOk?: (value: string[]) => void;
  onCancel?: () => void;
}
