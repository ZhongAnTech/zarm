import localeCN from './locale/zh_CN';

export type Locale = typeof localeCN;
export type Theme = 'dark' | 'light';
export type Primary = string;

export interface ConfigProviderProps {
  locale: Locale;
  theme: Theme;
  primary: Primary;
}
