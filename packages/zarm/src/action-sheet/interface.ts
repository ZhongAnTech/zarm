import * as React from 'react';
import type { ContainerType } from '../utils/dom';
import { Locale } from '../n-config-provider/interface';

export interface Action {
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  className?: string;
  onClick?: () => void;
}

export default interface PropsType {
  visible?: boolean;
  spacing?: boolean;
  actions?: Action[];
  cancelText?: string;
  onMaskClick?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
  destroy?: boolean;
  locale?: Locale['ActionSheet'];
  mountContainer?: ContainerType | false;
}
