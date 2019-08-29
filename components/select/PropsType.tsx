import BasePickerProps from '../picker/PropsType';

type getContainerFunc = () => HTMLElement;

export interface BaseSelectProps extends BasePickerProps {
  placeholder?: string;
  getContainer?: HTMLElement | getContainerFunc;
  displayRender?: (data?: object) => string;
}
