import type { Locale } from '../config-provider/PropsType';
import type { BaseDatePickerViewProps } from '../date-picker-view/PropsType';
import type { MountContainer } from '../utils/dom';

export interface BaseDatePickerProps
  extends Omit<BaseDatePickerViewProps, 'onChange' | 'stopScroll' | 'locale'> {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Date) => void;
  onCancel?: () => void;
  onChange?: (value: Date) => void;
  maskClosable?: boolean;
  mountContainer?: MountContainer;
  locale?: Locale['DatePickerView'] & Locale['DatePicker'];
}
