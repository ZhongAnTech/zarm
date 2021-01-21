export type WheelValue = string | number | boolean;

export interface WheelItem { [key: string]: WheelValue }
export default interface BaseWheelProps {
  value?: WheelValue;
  defaultValue?: WheelValue;
  valueMember?: string;
  dataSource: Array<WheelItem>;
  onChange?: (value?: WheelValue) => void;
  itemRender: (item?: WheelItem) => string;
  disabled?: boolean;
  stopScroll: boolean;
}
