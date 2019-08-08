import { BasePickerProps } from '../picker/PropsType';

export default interface BaseSelectProps extends BasePickerProps {
  placeholder?: string;
  displayRender?: (data?: object) => string;
}
