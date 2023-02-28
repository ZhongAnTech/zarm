import type { BasePickerViewProps, PickerColumnItem, PickerValue } from '../picker-view/interface';
import { MountContainer } from '../utils/dom';

export interface BasePickerContainerProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  visible?: boolean;
  maskClosable?: boolean;
  forceRender?: boolean;
  destroy?: boolean;
  safeArea?: boolean;
  mountContainer?: MountContainer;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  children?: React.ReactNode;
}

export interface BasePickerProps
  extends Omit<BasePickerContainerProps, 'children' | 'onConfirm'>,
    Omit<BasePickerViewProps, 'onChange'> {
  onChange?: (value: PickerValue[], items: PickerColumnItem[], index: number) => void;
  onConfirm?: (value: PickerValue[], items: PickerColumnItem[]) => void;
  onCancel?: () => void;
  children?: (items?: PickerColumnItem[]) => React.ReactNode;
}
