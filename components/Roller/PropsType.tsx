export interface BaseRollerProps {
  children: object[];
  selectedValue?: string[];
  defaultSelectedValue?: string;
  valueMember: string;
  onValueChange?: (value?: any) => void;
  disabled?: boolean;
  itemRender: (item?: object) => string;
}

export interface BaseRollerGroupProps {
  children: any[];
  selectedValue?: string[];
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
  itemRender: (item?: object) => string;
}

export interface BaseCascaderProps {
  data: any[];
  defaultValue?: string | any[];
  value?: string | any[];
  children?: any[];
  cols?: number;
  onChange: (value?: any) => any;
  valueMember: string;
  onValueChange?: (value?: any, i?: number) => void;
  itemRender: (item?: object) => string;
}
