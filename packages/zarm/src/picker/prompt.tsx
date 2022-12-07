import * as React from 'react';
import type { PickerColumnItem, PickerValue } from '../picker-view';
import { renderImperatively } from '../utils/dom';
import type { PickerProps } from './Picker';
import Picker from './Picker';

export interface PickerPromptValue {
  value: PickerValue[];
  items: PickerColumnItem[];
}

export const prompt = (props: Omit<PickerProps, 'value' | 'visible' | 'children'>) => {
  return new Promise<PickerPromptValue>((resolve) => {
    const { close } = renderImperatively(
      <Picker
        {...props}
        onConfirm={(value, items) => {
          props.onConfirm?.(value, items);
          close();
          resolve({ value, items });
        }}
        onCancel={() => {
          props.onCancel?.();
          close();
          resolve({ value: null, items: [] });
        }}
      />,
    );
  });
};
