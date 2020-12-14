import React, { PureComponent, createContext, Context } from 'react';
import { ConfigProviderProps, Locale } from './PropsType';
import setTheme from './setTheme';
import setPrimaryColor from './setPrimaryColor';

const defaultConfig: ConfigProviderProps = {
  locale: {} as any as Locale,
  theme: 'light',
  primary: '#00bc70',
};

export const LocaleContext: Context<Locale> = createContext(defaultConfig.locale);
export const ConfigContext: Context<ConfigProviderProps> = createContext(defaultConfig);

let runTimeLocale: Locale;
const changeRunTimeLocale = (locale: Locale) => {
  runTimeLocale = locale;
};

export const getRunTimeLocale = () => runTimeLocale;

export default class ConfigProvider extends PureComponent<ConfigProviderProps, {}> {
  static defaultProps = defaultConfig;

  render() {
    const { children, locale, theme, primary } = this.props;
    changeRunTimeLocale(locale);
    setTheme(theme);
    setPrimaryColor(primary);

    return (
      <ConfigContext.Provider value={{ locale, theme, primary }}>
        {React.Children.only(children)}
      </ConfigContext.Provider>
    );
  }
}
