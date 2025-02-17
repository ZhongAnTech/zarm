import * as React from 'react';
import { renderImperatively } from '../utils/dom';
import type { DatePickerProps } from './DatePicker';
import DatePicker from './DatePicker';

export interface DatePickerPromptValue {
  value: Date;
}

export const prompt = (props: Omit<DatePickerProps, 'value' | 'visible' | 'children'>) => {
  return new Promise<DatePickerPromptValue>((resolve) => {
    const { close } = renderImperatively(
      <DatePicker
        {...props}
        onConfirm={(value, items) => {
          props.onConfirm?.(value, items);
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
