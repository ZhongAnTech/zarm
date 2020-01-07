import { CSSProperties, ReactNode } from 'react';

export type CollapseItemKey = string | number;

export type CollapseActiveKey = CollapseItemKey | CollapseItemKey[];

export interface BaseCollapseProps {
  activeKey?: CollapseActiveKey;
  defaultActiveKey?: CollapseActiveKey;
  multiple?: boolean;
  animated?: boolean;
  onChange: (activeKey?: CollapseActiveKey) => void;
  style?: CSSProperties;
}

export interface BaseCollapseItemProps {
  title?: ReactNode;
  isActive: boolean;
  itemKey?: CollapseItemKey;
  disabled?: boolean;
  animated: boolean;
  onChange?: (active?: boolean) => void;
  style?: CSSProperties;
}
