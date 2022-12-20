import * as React from 'react';
import type { DatePickerValue } from '../date-picker-view/interface';
import { renderImperatively } from '../utils/dom';
import type { DatePickerProps } from './DatePicker';
import DatePicker from './DatePicker';

export interface DatePickerPromptValue {
  value: DatePickerValue;
}

export const prompt = (props: Omit<DatePickerProps, 'value' | 'visible' | 'children'>) => {
  return new Promise<DatePickerPromptValue>((resolve) => {
    const { close } = renderImperatively(
      <DatePicker
        {...props}
        onConfirm={(value) => {
          props.onConfirm?.(value);
          close();
          resolve({ value });
        }}
        onCancel={() => {
          props.onCancel?.();
          close();
          resolve({ value: null });
        }}
      />,
    );
  });
};
