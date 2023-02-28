import type { MountContainer, ScrollContainer } from '../utils/dom';
import type { CssVars } from './cssVars';
import localeCN from './locale/zh_CN';

export type Locale = typeof localeCN;

export interface ConfigProviderProps {
  prefixCls?: string;
  locale?: Locale;
  primaryColor?: string;
  theme?: 'dark' | 'light';
  safeArea?: boolean;
  mountContainer?: MountContainer;
  scrollContainer?: ScrollContainer;
  cssVars?: CssVars;
}
