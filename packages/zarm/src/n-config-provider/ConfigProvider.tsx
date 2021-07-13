import * as React from 'react';
import type { Context } from 'react';
import type { ConfigProviderProps } from './interface';
import defaultLocaleData from './locale/zh_CN';

const defaultConfig: ConfigProviderProps = {
  prefixCls: 'za',
  locale: defaultLocaleData,
  theme: 'light',
  primaryColor: '#00bc70',
  safeIphoneX: false,
};

export const ConfigContext: Context<ConfigProviderProps> = React.createContext(defaultConfig);

const ConfigProvider = (props: React.PropsWithChildren<ConfigProviderProps>) => {
  const { children, ...restProps } = props;

  return (
    <ConfigContext.Provider value={{ ...restProps }}>
      {React.Children.only(children)}
    </ConfigContext.Provider>
  );
};

ConfigProvider.displayName = 'ConfigProvider';

ConfigProvider.defaultProps = defaultConfig;

export default ConfigProvider;
