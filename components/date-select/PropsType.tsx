import BaseDatePickerProps from '../date-picker/PropsType';

type datePickerPropsWithoutVisible = Omit<BaseDatePickerProps, 'visible'>;

export default interface BaseDateSelectProps extends datePickerPropsWithoutVisible {
  placeholder?: string;
  format?: string;
  hasArrow?: boolean;
}
