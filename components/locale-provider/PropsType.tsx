export interface Locale {
  locale?: string;
  [key: string]: any;
}

export interface LocaleProviderProps {
  locale: Locale;
}
