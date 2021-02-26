import React, { PureComponent, createContext, Context } from 'react';
import { ConfigProviderProps, Locale } from './PropsType';
import setTheme from './setTheme';
import setPrimaryColor from './setPrimaryColor';

const defaultConfig: ConfigProviderProps = {
  locale: ({} as any) as Locale,
  theme: 'light',
  primaryColor: '#00bc70',
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
    const { children, locale, theme, primaryColor } = this.props;
    changeRunTimeLocale(locale);
    setTheme(theme);
    setPrimaryColor(primaryColor);

    return (
      <ConfigContext.Provider value={{ locale, theme, primaryColor }}>
        {React.Children.only(children)}
      </ConfigContext.Provider>
    );
  }
}
