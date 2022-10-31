import type { BaseDatePickerViewProps } from '../date-picker-view/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseDatePickerProps extends Omit<BaseDatePickerViewProps, 'onChange'> {
  visible?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (value: Date) => void;
  onCancel?: () => void;
  onChange?: (value: Date) => void;
  maskClosable?: boolean;
  mountContainer?: MountContainer;
}
