import * as React from 'react';
import type { BasePickerProps } from '../picker/PropsType';
import type { WheelItem } from '../wheel/interface';
import type { Locale } from '../config-provider/PropsType';

export interface BaseSelectProps extends Omit<BasePickerProps, 'visible' | 'locale'> {
  placeholder?: string;
  displayRender?: (data?: Array<WheelItem>) => React.ReactNode;
  locale?: Locale['Picker'] & Locale['Select'];
}
