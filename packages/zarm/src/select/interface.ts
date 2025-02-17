import * as React from 'react';
import type { PickerColumnItem } from '../picker-view/interface';
import type { BasePickerProps } from '../picker/interface';

export interface BaseSelectProps extends Omit<BasePickerProps, 'visible'> {
  placeholder?: string;
  displayRender?: (data?: PickerColumnItem[]) => React.ReactNode;
}
