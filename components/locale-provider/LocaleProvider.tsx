import React, { PureComponent } from 'react';
import createContext, { Context } from 'create-react-context';
import { LocaleProviderProps, Locale } from './PropsType';

const defaultLocale = {} as any as Locale;
export const LocaleContext: Context<Locale> = createContext(defaultLocale);

export default class LocaleProvider extends PureComponent<LocaleProviderProps, {}> {
  static defaultProps = {
    locale: {},
  };

  render() {
    const { children, locale } = this.props;
    return (
      <LocaleContext.Provider value={locale}>
        {React.Children.only(children)}
      </LocaleContext.Provider>
    );
  }
}
