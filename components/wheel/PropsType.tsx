export interface BaseWheelProps {
  value?: string | number;
  defaultValue?: string | number;
  valueMember?: string;
  dataSource?: object[];
  onChange?: (value?: string | number) => void;
  itemRender?: (item?: object) => string;
  disabled?: boolean;
  onTransition?: (value: boolean) => void;
}
