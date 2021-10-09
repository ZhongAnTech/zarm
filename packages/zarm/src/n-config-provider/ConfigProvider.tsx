import * as React from 'react';
import type { Context } from 'react';
import type { ConfigProviderProps } from './interface';
import defaultLocaleData from './locale/zh_CN';
import setCssVars, { defaultCssVars } from './setCssVars';
import setPrimaryColor from './setPrimaryColor';
import setTheme from './setTheme';

const defaultConfig: ConfigProviderProps = {
  prefixCls: 'za',
  locale: defaultLocaleData,
  theme: 'light',
  safeIphoneX: false,
  cssVars: defaultCssVars,
};

export const ConfigContext: Context<ConfigProviderProps> = React.createContext(defaultConfig);

const ConfigProvider = (props: React.PropsWithChildren<ConfigProviderProps>) => {
  const { children, cssVars, primaryColor, theme, ...restProps } = props;

  React.useEffect(() => {
    primaryColor && setPrimaryColor(primaryColor);
  }, [primaryColor]);

  React.useEffect(() => {
    theme && setTheme(theme);
  }, [theme]);

  const newChildren = setCssVars(children, cssVars);

  return (
    <ConfigContext.Provider value={{ ...restProps }}>
      {React.Children.only(newChildren)}
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = 'ConfigProvider';

ConfigProvider.defaultProps = defaultConfig;

export default ConfigProvider;
