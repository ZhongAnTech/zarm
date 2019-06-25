import badgePropsType from '../badge/PropsType';

export interface BaseTabBarProps {
  onChange?: Function;
  visible?: boolean;
  defaultActiveKey?: string | number;
  activeKey?: string | number;
  style?: React.CSSProperties;
}


export interface BaseTabBarItemProps {
  itemKey?: string | number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: badgePropsType;
  selected?: boolean;
  style?: React.CSSProperties;
  onChange?: (value?: number | string) => void;
}
