import { ReactNode } from 'react';

export type CollapseItemKey = string | number;

export type CollapseActiveKey = CollapseItemKey | CollapseItemKey[];

export interface BaseCollapseProps {
  activeKey?: CollapseActiveKey;
  defaultActiveKey?: CollapseActiveKey;
  multiple?: boolean;
  animated?: boolean;
  onChange?: (activeKey: CollapseActiveKey) => void;
}

export interface BaseCollapseItemProps {
  key?: CollapseItemKey;
  title?: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  animated?: boolean;
  onChange?: (active: boolean) => void;
}
