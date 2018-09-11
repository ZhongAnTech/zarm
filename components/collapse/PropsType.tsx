export interface BaseCollapseProps {
  activeKey?: string | number | Array<string | number>;
  defaultActiveKey?: string | number | Array<string | number>;
  multiple?: boolean;
  animated?: boolean;
  style?: React.CSSProperties;
  onChange: (activeKey: string | number) => void;
}

export interface BaseCollapseItemProps {
  title?: React.ReactNode;
  key: string | number;
  animated?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onItemChange?: (key?: string | number) => void;
}
