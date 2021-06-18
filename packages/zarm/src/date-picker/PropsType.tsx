import type { Locale } from '../config-provider/PropsType';
import type { BaseDatePickerViewProps } from '../date-picker-view/PropsType';
import type { ContainerType } from '../utils/dom';

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
  mountContainer?: ContainerType;
  locale?: Locale['DatePickerView'] & Locale['DatePicker'];
}
