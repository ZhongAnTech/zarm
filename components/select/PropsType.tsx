import BasePickerProps from '../picker/PropsType';

type pickerPropsWithoutVisible = Omit<BasePickerProps, 'visible'>;

export default interface BaseSelectProps extends pickerPropsWithoutVisible {
  placeholder?: string;
  displayRender?: (data?: object) => string;
  hasArrow?: boolean;
}
