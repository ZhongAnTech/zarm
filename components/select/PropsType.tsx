import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';

type getContainerFunc = () => HTMLElement;
export default interface BaseSelectProps extends BasePickerViewProps {
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  maskClosable?: boolean;
  children?: any;
  locale?: Locale['Picker'] & Locale['Select'];
  placeholder?: string;
  getContainer?: HTMLElement | getContainerFunc;
  displayRender?: (data?: object) => string;
}
