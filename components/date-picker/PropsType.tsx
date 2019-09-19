import BaseDatePickerViewProps from '../date-picker-view/PropsType';

type getContainerFunc = () => HTMLElement;

export default interface BaseDatePickerProps extends BaseDatePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value?: object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  getContainer?: HTMLElement | getContainerFunc;
  children?: any;
}
