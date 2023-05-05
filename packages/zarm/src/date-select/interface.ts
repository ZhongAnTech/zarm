import type { BaseDatePickerProps } from '../date-picker/interface';
import { PickerColumnItem } from '../picker-view';

export interface BaseDateSelectProps extends Omit<BaseDatePickerProps, 'visible'> {
  placeholder?: string;
  hasArrow?: boolean;
  displayRender?: (items: PickerColumnItem[]) => React.ReactNode;
  onChange?: (value: Date, items: PickerColumnItem[]) => void;
}
