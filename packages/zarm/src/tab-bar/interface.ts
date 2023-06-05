import type { ReactNode } from 'react';
import type { BaseBadgeProps } from '../badge/interface';

export interface BaseTabBarProps {
  defaultActiveKey?: string | number;
  activeKey?: string | number;
  safeArea?: boolean;
  onChange?: (value: number | string) => void;
}

export interface BaseTabBarItemProps {
  itemKey?: string | number;
  title?: ReactNode;
  icon?: ReactNode;
  activeIcon?: ReactNode;
  badge?: BaseBadgeProps;
  selected?: boolean;
}
