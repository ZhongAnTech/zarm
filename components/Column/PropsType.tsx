export interface BaseColumnProps {
  children: object[];
  selectedValue?: string[];
  defaultSelectedValue?: string;
  valueMember: string;
  onValueChange?: (value?: any) => void;
  disabled?: boolean;
  itemStyle?: object;
  itemRender: (data?: object) => string;
}

export interface BaseColumnGroupProps {
  children: any[];
  selectedValue?: string[];
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
  itemRender: (data?: object) => string;
}

export interface BaseCascaderProps {
  data: any[];
  defaultValue?: string | any[];
  value?: string | any[];
  children?: any[];
  cols?: number;
  onChange: (value?: any) => any;
  selectedValue?: string[];
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
  itemRender: (data?: object) => string;
}
