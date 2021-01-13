export type WheelValue = string | number | boolean;

export interface IWheelItem { [key: string]: WheelValue }
export default interface BaseWheelProps {
  value?: WheelValue;
  defaultValue?: WheelValue;
  valueMember?: string;
  dataSource: Array<IWheelItem>;
  onChange?: (value?: WheelValue) => void;
  itemRender: (item?: IWheelItem) => string;
  disabled?: boolean;
  stopScroll: boolean;
}
