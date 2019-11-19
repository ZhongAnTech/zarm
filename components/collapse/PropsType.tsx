import { CSSProperties, ReactNode } from 'react';

export interface BaseCollapseProps {
  activeKey?: string | number | string[] | number[];
  defaultActiveKey?: string | number | string[] | number[];
  multiple?: boolean;
  animated?: boolean;
  style?: CSSProperties;
  onChange: (activeKey?: string[] | number[]) => void;
}

export interface BaseCollapseItemProps {
  title?: ReactNode;
  isActive: boolean;
  itemKey?: string | number;
  disabled?: boolean;
  animated: boolean;
  onChange?: (active?: boolean) => void;
  style?: CSSProperties;
}
