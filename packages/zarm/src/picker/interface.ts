import { MountContainer } from '../utils/dom';
import type { BasePickerViewProps, PickerDataSourceItem } from '../picker-view/interface';
import type { WheelValue } from '../wheel/interface';

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
    Omit<BasePickerViewProps, 'onChange' | 'stopScroll'> {
  onChange?: (value: WheelValue[], dataSource: PickerDataSourceItem[], level: number) => void;
  onConfirm?: (value: WheelValue[], dataSource: PickerDataSourceItem[]) => void;
  onCancel?: () => void;
}
