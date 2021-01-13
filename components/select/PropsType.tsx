import BasePickerProps from '../picker/PropsType';
import { WheelValue, IWheelItem } from '../wheel/PropsType';

type pickerPropsWithoutVisible = Omit<BasePickerProps, 'visible'>;

export default interface BaseSelectProps extends pickerPropsWithoutVisible {
  placeholder?: string;
  displayRender?: (data?: Array<IWheelItem>) => WheelValue;
  hasArrow?: boolean;
}
