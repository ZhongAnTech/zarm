import React, { PureComponent, createContext } from 'react';
import type { Context } from 'react';
import type { ConfigProviderProps, Locale } from './PropsType';
import setTheme from './setTheme';
import setPrimaryColor from './setPrimaryColor';

const defaultConfig: ConfigProviderProps = {
  locale: ({} as unknown) as Locale,
  theme: 'light',
  primaryColor: '#00bc70',
  safeIphoneX: false,
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
    const { children, locale, theme, primaryColor, safeIphoneX } = this.props;
    changeRunTimeLocale(locale);
    setTheme(theme);
    setPrimaryColor(primaryColor);

    return (
      <ConfigContext.Provider value={{ locale, theme, primaryColor, safeIphoneX }}>
        {React.Children.only(children)}
      </ConfigContext.Provider>
    );
  }
}
