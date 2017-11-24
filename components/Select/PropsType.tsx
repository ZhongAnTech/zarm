export interface BaseSelectProps {
  type?: 'number' | 'price' | 'idcard' | 'select';
  placeholder?: string;
  title?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  dataSource: object[];
  valueMember?: string;
  cols?: number;
  onChange?: (value?: object) => void;
  displayRender?: (data?: object) => string;
  itemRender?: (data?: object) => string;
}
