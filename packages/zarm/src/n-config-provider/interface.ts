import type localeCN from './locale/zh_CN';
import type { ContainerType } from '../utils/dom';

export type Locale = typeof localeCN;
export type Theme = 'dark' | 'light';
export type PrimaryColor = string;

export interface ConfigProviderProps {
  prefixCls?: string;
  locale?: Locale;
  theme?: Theme;
  primaryColor?: PrimaryColor;
  safeIphoneX?: boolean;
  mountContainer?: ContainerType;
}
