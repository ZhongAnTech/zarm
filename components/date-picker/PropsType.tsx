import BaseDatePickerViewProps from '../date-picker-view/PropsType';

type getContainerFunc = () => HTMLElement;

export default interface BaseDatePickerProps extends BaseDatePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Date) => void;
  onCancel?: () => void;
  onChange?: (value: Date) => void;
  maskClosable?: boolean;
  getContainer?: HTMLElement | getContainerFunc;
}
