import * as React from 'react';
import type { Locale } from '../config-provider/interface';

export default interface BaseSearchBarProps {
  shape?: 'rect' | 'radius' | 'round';
  icon?: React.ReactNode;
  cancelText?: React.ReactNode;
  showCancel?: boolean | ((focus: boolean, value: string) => boolean);
  clearable?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: string) => void;
  locale?: Locale['SearchBar'];
}
