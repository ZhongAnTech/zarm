import localeCN from './locale/zh_CN';
import type { CssVars } from './setCssVars';
import type { ContainerType } from '../utils/dom';

export type Locale = typeof localeCN;
export type Theme = 'dark' | 'light';
export type PrimaryColor = string;
export type { CssVars };

export interface ConfigProviderProps {
  prefixCls?: string;
  locale?: Locale;
  theme?: Theme;
  primaryColor?: PrimaryColor;
  safeIphoneX?: boolean;
  mountContainer?: ContainerType;
  cssVars?: CssVars;
}
