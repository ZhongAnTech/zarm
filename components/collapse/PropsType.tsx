import { CSSProperties, ReactNode } from 'react';

export interface BaseCollapseProps {
  activeKey?: string | number | string[] | number[];
  defaultActiveKey?: string | number | string[] | number[];
  multiple?: boolean;
  animated?: boolean;
  style?: CSSProperties;
  onChange: (activeKey?: string | number) => void;
}

export interface BaseCollapseItemProps {
  title?: ReactNode;
  itemKey: string | number;
  animated?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  onItemChange?: (itemKey?: string | number) => void;
  onChange?: (itemKey?: string | number) => void;
  style?: CSSProperties;
}
