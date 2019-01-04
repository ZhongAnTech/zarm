export interface Locale {
  lang: string;
}

export default interface PropsType {
  locale: Locale;
  children?: React.ReactNode;
}
