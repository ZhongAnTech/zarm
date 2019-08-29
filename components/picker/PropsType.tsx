import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';

type getContainerFunc = () => HTMLElement;

export default interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  getContainer?: HTMLElement | getContainerFunc;
  children?: any;
  onTransition?: (value: boolean) => void;
  locale?: Locale['Picker'] & Locale['Select'];
}
