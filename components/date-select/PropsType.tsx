import BaseDatePickerProps from '../date-picker/PropsType';

type getContainerFunc = () => HTMLElement;

export default interface BaseDateSelectProps extends BaseDatePickerProps {
  placeholder?: string;
  format?: string;
  getContainer: HTMLElement | getContainerFunc;
}
