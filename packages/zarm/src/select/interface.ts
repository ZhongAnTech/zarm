import * as React from 'react';
import type { BasePickerProps } from '../picker/interface';
import type { PickerViewColumnItem } from '../picker-view/interface';

export interface BaseSelectProps extends Omit<BasePickerProps, 'visible'> {
  placeholder?: string;
  displayRender?: (data?: PickerViewColumnItem[]) => React.ReactNode;
}
