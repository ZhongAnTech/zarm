import type localeCN from './locale/zh_CN';

export type Locale = typeof localeCN;
export type Theme = 'dark' | 'light';
export type PrimaryColor = string;

export interface ConfigProviderProps {
  locale: Locale;
  theme: Theme;
  primaryColor: PrimaryColor;
  safeIphoneX: boolean;
}
