import * as React from 'react';
import { CascaderValue } from '../cascader-view/interface';
import { renderImperatively } from '../utils/dom';
import type { CascaderProps } from './Cascader';
import Cascader from './Cascader';

export interface CascaderPromptValue {
  value: CascaderValue[];
}

export const prompt = (props: Omit<CascaderProps, 'value' | 'visible' | 'children'>) => {
  return new Promise<CascaderPromptValue>((resolve) => {
    const { close } = renderImperatively(
      <Cascader
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
