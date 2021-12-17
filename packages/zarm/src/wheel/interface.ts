import { ReactNode } from 'react';

export type WheelValue = string | number | boolean;

export interface WheelItem {
  [key: string]: WheelValue;
}

export interface BaseWheelProps {
  value?: WheelValue;
  defaultValue?: WheelValue;
  valueMember?: string;
  dataSource: Array<WheelItem>;
  onChange?: (value: WheelValue) => void;
  itemRender: (item: WheelItem) => ReactNode;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  disabled?: boolean;
  stopScroll?: boolean;
}
