import { ReactNode } from 'react';
import { FieldNames as WheelFieldNames, WheelValue } from '../wheel/interface';

export type CascaderValue = WheelValue;

export interface CascaderOption {
  [key: string]: any;
  label: ReactNode;
  value: WheelValue;
  children: CascaderOption[];
}

type FieldNames = Partial<WheelFieldNames> & {
  children?: string;
};

export type CascaderItem = Pick<CascaderOption, 'label' | 'value'>;

type TItemRender = (data: CascaderItem) => ReactNode;

export interface BaseCascaderViewProps {
  defaultValue?: CascaderValue[];
  value?: CascaderValue[];
  dataSource: CascaderOption[];
  fieldNames?: FieldNames;
  cols?: number;
  itemRender?: TItemRender;
  onChange?: (selected: string[]) => void;
}
