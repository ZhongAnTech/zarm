import type { BaseDatePickerViewProps } from '../date-picker-view/interface';
import type { MountContainer } from '../utils/dom';

export interface BaseDatePickerProps
  extends Omit<BaseDatePickerViewProps, 'onChange' | 'fieldNames'> {
  visible?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (value: Date | string) => void;
  onCancel?: () => void;
  onChange?: (value: Date | string) => void;
  maskClosable?: boolean;
  mountContainer?: MountContainer;
}
