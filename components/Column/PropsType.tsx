export interface BaseColumnProps {
  children: object[];
  selectedValue?: string[];
  defaultSelectedValue?: string;
  displayMember: string;
  valueMember: string;
  onValueChange?: (value?: any) => void;
  disabled?: boolean;
  itemStyle?: object;
}

export interface BaseColumnGroupProps {
  children: any[];
  selectedValue?: string[];
  displayMember: string;
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
}

export interface BaseCascaderProps {
  data: any[];
  defaultValue?: string | any[];
  value?: string | any[];
  children?: any[];
  cols?: number;
  onChange: (value?: any) => any;
  selectedValue?: string[];
  displayMember: string;
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
}
