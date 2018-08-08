export interface BaseCollapseProps {
  activeKey?: string | number | Array<string | number>;
  defaultActiveKey?: string | number | Array<string | number>;
  multiple?: boolean;
  animated?: boolean;
  style?: object;
  onChange: (activeKey: string | number) => void;
}

export interface BaseCollapseItemProps {
  title?: React.ReactNode;
  key: string | number;
  animated?: boolean;
  style?: object;
  disabled?: boolean;
  onItemChange?: (key?: string | number) => void;
}
