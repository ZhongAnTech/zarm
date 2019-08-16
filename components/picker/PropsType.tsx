import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';

export default interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  children?: any;
  locale?: Locale['Picker'] & Locale['Select'];
}
