import type { ReactNode, CSSProperties } from 'react';
import type { BaseBadgeProps } from '../badge/interface';

export interface BaseTabBarProps {
  onChange?: (value?: number | string) => void;
  visible?: boolean;
  defaultActiveKey?: string | number;
  activeKey?: string | number;
  style?: CSSProperties;
}

export interface BaseTabBarItemProps {
  itemKey?: string | number;
  title?: ReactNode;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  badge?: BaseBadgeProps;
  selected?: boolean;
  style?: CSSProperties;
  onChange?: (value?: number | string) => void;
}
