import * as React from 'react';
import type { BasePickerProps } from '../picker/interface';
import type { WheelItem } from '../wheel/interface';

export interface BaseSelectProps extends Omit<BasePickerProps, 'visible'> {
  placeholder?: string;
  displayRender?: (data?: Array<WheelItem>) => React.ReactNode;
}
