import type { BaseDatePickerViewProps } from '../date-picker-view/interface';
import type { PickerColumnItem } from '../picker-view';
import type { BasePickerProps } from '../picker/interface';

export interface BaseDatePickerProps
  extends Omit<
      BasePickerProps,
      'value' | 'defaultValue' | 'wheelDefaultValue' | 'onConfirm' | 'onChange'
    >,
    Omit<BaseDatePickerViewProps, 'onChange' | 'fieldNames'> {
  onConfirm?: (value: Date, items: PickerColumnItem[]) => void;
  onChange?: (value: Date, items: PickerColumnItem[], level: number) => void;
}
