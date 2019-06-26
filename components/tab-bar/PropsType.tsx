import { ReactNode, CSSProperties } from 'react';
import badgePropsType from '../badge/PropsType';


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
  badge?: badgePropsType;
  selected?: boolean;
  style?: CSSProperties;
  onChange?: (value?: number | string) => void;
}
