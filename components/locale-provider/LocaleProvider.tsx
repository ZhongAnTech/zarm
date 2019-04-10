import React, { PureComponent } from 'react';
import createContext, { Context } from 'create-react-context';
import { Locale, LocaleProviderProps } from './PropsType';

export const LocaleContext: Context<Locale> = createContext({});

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
