import localeCN from './locale/zh_CN';
import type { ContainerType } from '../utils/dom';
import type { CssVars } from './cssVars';

export interface ConfigProviderProps {
  prefixCls?: string;
  locale?: typeof localeCN;
  primaryColor?: string;
  theme?: 'dark' | 'light';
  safeIphoneX?: boolean;
  mountContainer?: ContainerType;
  cssVars?: CssVars;
}
