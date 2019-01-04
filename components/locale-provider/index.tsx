import React, { PureComponent } from 'react';
import createContext, { Context } from 'create-react-context';
// import PropsType from './PropsType';

interface Locale {
  locale: string;
}

export default interface PropsType {
  locale: Locale;
  children?: React.ReactNode;
}

export interface LocaleProviderProps extends PropsType {}

export const LocaleContext: Context<Locale> = createContext({ locale: 'en' });

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
