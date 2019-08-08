import { BasePickerViewProps, BasePickerViewState } from '../picker-view/PropsType';
import { Locale } from '../locale-provider/PropsType';

export interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  onOk?: (value: Array<{ [key: string]: any }>) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  children?: any;
  onTransition?: (value: boolean) => void;
  locale?: Locale['Picker'] & Locale['Select'];
}

export interface BasePickerState extends BasePickerViewState {
  objValue?: Array<{ [key: string]: any }>;
  visible: boolean;
  tempValue?: string[] | number[];
  tempObjValue?: Array<{ [key: string]: any }>;
  prevVisible?: boolean;
}
