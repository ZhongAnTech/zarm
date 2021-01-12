import BasePickerProps from '../picker/PropsType';
import { WheelValue, IObjValue } from '../wheel/PropsType';

type pickerPropsWithoutVisible = Omit<BasePickerProps, 'visible'>;

export default interface BaseSelectProps extends pickerPropsWithoutVisible {
  placeholder?: string;
  displayRender?: (data?: Array<IObjValue>) => WheelValue;
  hasArrow?: boolean;
}
