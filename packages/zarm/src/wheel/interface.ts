import * as React from 'react';

export type WheelValue = string | number | boolean;

export interface WheelItem {
  value?: WheelValue;
  label?: React.ReactNode;
  [key: string]: any;
}

export interface FieldNames {
  value: string;
  label: string;
}

export interface BaseWheelProps {
  value?: WheelValue;
  defaultValue?: WheelValue;
  fieldNames?: Partial<FieldNames>;
  dataSource?: Array<WheelItem>;
  disabled?: boolean;
  stopScroll?: boolean;
  itemRender?: (item: WheelItem) => React.ReactNode;
  onChange?: (value: WheelValue) => void;
}
