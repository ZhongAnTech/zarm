import { BasePickerViewProps } from '../PickerView/PropsType';

export interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value?: object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  children?: any;
  onTransition?: (value: boolean) => void;
}
