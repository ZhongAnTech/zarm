import { ReactNode } from 'react';
import BasePickerProps from '../picker/PropsType';
import { WheelItem } from '../wheel/PropsType';

type pickerPropsWithoutVisible = Omit<BasePickerProps, 'visible'>;

export default interface BaseSelectProps extends pickerPropsWithoutVisible {
  placeholder?: string;
  displayRender?: (data?: Array<WheelItem>) => ReactNode;
  hasArrow?: boolean;
}
