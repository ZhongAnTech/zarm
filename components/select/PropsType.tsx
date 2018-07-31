import { BasePickerProps } from '../picker/PropsType';

export interface BaseSelectProps extends BasePickerProps {
  placeholder?: string;
  displayRender?: (data?: object) => string;
}
