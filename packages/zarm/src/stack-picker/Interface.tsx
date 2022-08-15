import { ReactNode } from 'react';
import type { MountContainer } from '../utils/dom';

export interface IDataSource {
  [key: string]: any;
  label: string;
  value: string;
  children: IDataSource[];
}

export type TDataSource = Pick<IDataSource, 'label' | 'value'>;

type TItemRender = (data: TDataSource) => string;

export interface BaseStackPickerProps {
  defaultValue?: ReactNode[];
  value?: ReactNode[];
  displayMember?: string;
  valueMember?: string;
  dataSource: IDataSource[];
  title?: string;
  visible?: boolean;
  maskClosable?: boolean;
  cols?: number;
  cancelText?: string;
  confirmText?: string;
  mountContainer?: MountContainer;
  itemRender?: TItemRender;
  onChange?: (selected: string[]) => void;
  onConfirm?: (value: string[]) => void;
  onCancel?: () => void;
}
