import { BasePickerProps } from '../Picker/PropsType';

export interface BaseSelectProps extends BasePickerProps {
  placeholder?: string;
  displayRender?: (data?: object) => string;
}
