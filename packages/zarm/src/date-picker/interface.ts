import * as React from 'react';
import type { BaseDatePickerViewProps } from '../date-picker-view/interface';
import type { PickerColumnItem } from '../picker-view';
import type { MountContainer } from '../utils/dom';

export interface BaseDatePickerProps
  extends Omit<BaseDatePickerViewProps, 'onChange' | 'fieldNames'> {
  visible?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (value: Date, items: PickerColumnItem[]) => void;
  onChange?: (value: Date, items: PickerColumnItem[], level: number) => void;
  onCancel?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  maskClosable?: boolean;
  mountContainer?: MountContainer;
  children?: (items: PickerColumnItem[]) => React.ReactNode;
}
