import { MountContainer } from '../utils/dom';
import type {
  BasePickerViewProps,
  PickerViewColumnItem,
  PickerViewValue,
} from '../picker-view/interface';

export type PickerValue = PickerViewValue;

export interface BasePickerContainerProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  visible?: boolean;
  maskClosable?: boolean;
  forceRender?: boolean;
  destroy?: boolean;
  mountContainer?: MountContainer;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface BasePickerProps
  extends Omit<BasePickerContainerProps, 'onConfirm'>,
    Omit<BasePickerViewProps, 'onChange'> {
  onChange?: (value: PickerValue[], items: PickerViewColumnItem[], level: number) => void;
  onConfirm?: (value: PickerValue[], items: PickerViewColumnItem[]) => void;
  onCancel?: () => void;
}
