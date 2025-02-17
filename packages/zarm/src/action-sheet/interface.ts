import * as React from 'react';
import type { Locale } from '../config-provider/interface';
import type { PopupProps } from '../popup';
import type { MountContainer } from '../utils/dom';

export interface BaseActionSheetItemProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  bold?: boolean;
}

export interface BaseActionSheetProps {
  visible?: boolean;
  spacing?: boolean;
  cancelText?: string;
  onMaskClick?: PopupProps['onMaskClick'];
  onCancel?: () => void;
  afterClose?: () => void;
  destroy?: boolean;
  locale?: Locale['ActionSheet'];
  mountContainer?: MountContainer;
}
