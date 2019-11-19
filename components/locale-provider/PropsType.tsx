import localeCN from './locale/zh_CN';

export type Locale = typeof localeCN;

export interface LocaleProviderProps {
  locale: Locale;
}
