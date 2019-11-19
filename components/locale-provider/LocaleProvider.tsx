import React, { PureComponent } from 'react';
import createContext, { Context } from 'create-react-context';
import { LocaleProviderProps, Locale } from './PropsType';

const defaultLocale = {} as any as Locale;
export const LocaleContext: Context<Locale> = createContext(defaultLocale);

let runTimeLocale: Locale;
const changeRunTimeLocale = (locale: Locale) => {
  runTimeLocale = locale;
};

export const getRunTimeLocale = () => runTimeLocale;

export default class LocaleProvider extends PureComponent<LocaleProviderProps, {}> {
  static defaultProps = {
    locale: {},
  };

  render() {
    const { children, locale } = this.props;
    changeRunTimeLocale(locale);
    return (
      <LocaleContext.Provider value={locale}>
        {React.Children.only(children)}
      </LocaleContext.Provider>
    );
  }
}
