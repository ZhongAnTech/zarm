import BaseDatePickerViewProps from '../date-picker-view/PropsType';
import { ContainerType } from '../popup/PropsType';

export default interface BaseDatePickerProps extends BaseDatePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Date) => void;
  onCancel?: () => void;
  onChange?: (value: Date) => void;
  maskClosable?: boolean;
  getContainer?: ContainerType;
}
