import { ContainerType } from '../utils/dom';
import type { BasePickerViewProps } from '../picker-view/interface';
import type { WheelItem } from '../wheel/interface';

export interface BasePickerProps extends Omit<BasePickerViewProps, 'onChange' | 'stopScroll'> {
  visible?: boolean;
  title?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  destroy?: boolean;
  onChange?: (selected: Array<WheelItem>) => void;
  onOk?: (selected: Array<WheelItem>) => void;
  onCancel?: () => void;
  mountContainer?: ContainerType;
}
