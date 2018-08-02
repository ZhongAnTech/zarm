export interface BaseCollapseProps {
  activeKey?: string | number | Array<string | number>;
  defaultActiveKey?: string | number | Array<string | number>;
  multiple?: boolean;
  animated?: boolean;
  open?: boolean;
  style?: object;
  onChange: (activeKey: string | number) => void;
}

export interface BaseCollapseItemProps {
  title?: string | JSX.Element;
  index: number;
  key?: string | number;
  animated?: boolean;
  open?: boolean;
  style?: object;
  disabled?: boolean;
  onItemChange: (key?: string | number) => void;
}
