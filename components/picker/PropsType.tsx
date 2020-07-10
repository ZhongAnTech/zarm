import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';
import { ContainerType } from '../utils/dom';

export default interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  destroy: boolean;
  onChange?: (selected: Array<{ [key: string]: any }>) => void;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  mountContainer?: ContainerType;
  locale?: Locale['Picker'] & Locale['Select'];
}
