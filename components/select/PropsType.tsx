import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';

export default interface BaseSelectProps extends BasePickerViewProps {
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  children?: any;
  onTransition?: (value: boolean) => void;
  locale?: Locale['Picker'] & Locale['Select'];
  placeholder?: string;
  displayRender?: (data?: object) => string;
}
