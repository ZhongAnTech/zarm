import BasePickerViewProps from '../picker-view/PropsType';
import { Locale } from '../config-provider/PropsType';
import { ContainerType } from '../utils/dom';
import { WheelValue, IObjValue } from '../wheel/PropsType';

export default interface BasePickerProps extends Omit<BasePickerViewProps, 'onChange' | 'stopScroll'> {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  destroy: boolean;
  onChange?: (selected: Array<IObjValue>) => void;
  onOk?: (selected: Array<IObjValue>) => void;
  onCancel?: () => void;
  mountContainer?: ContainerType;
  locale?: Locale['Picker'] & Locale['Select'];
}
