import * as React from 'react';
import type { ContainerType } from '../utils/dom';
import type { Locale } from '../n-config-provider/interface';

export interface BaseActionSheetActionProps {
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  onClick?: () => void;
  disabled: boolean;
}

export interface BaseActionSheetProps {
  visible?: boolean;
  spacing?: boolean;
  actions?: BaseActionSheetActionProps[];
  cancelText?: string;
  onMaskClick?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
  destroy?: boolean;
  locale?: Locale['ActionSheet'];
  mountContainer?: ContainerType;
}
