import BaseDatePickerViewProps from '../date-picker-view/PropsType';
import { ContainerType } from '../utils/dom';

export default interface BaseDatePickerProps extends Omit<BaseDatePickerViewProps, 'onChange' | 'stopScroll'> {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Date) => void;
  onCancel?: () => void;
  onChange?: (value: Date) => void;
  maskClosable?: boolean;
  mountContainer?: ContainerType;
}
