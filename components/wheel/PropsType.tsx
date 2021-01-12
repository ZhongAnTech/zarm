export type WheelValue = string | number | boolean;

export interface IObjValue { [key: string]: WheelValue }
export default interface BaseWheelProps {
  value?: WheelValue;
  defaultValue?: WheelValue;
  valueMember?: string;
  dataSource: Array<IObjValue>;
  onChange?: (value?: WheelValue) => void;
  itemRender: (item?: IObjValue) => string;
  disabled?: boolean;
  stopScroll: boolean;
}
