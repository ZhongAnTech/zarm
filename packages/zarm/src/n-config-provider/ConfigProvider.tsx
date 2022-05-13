import * as React from 'react';
import type { Context } from 'react';
import type { ConfigProviderProps } from './interface';
import defaultLocaleData from './locale/zh_CN';
import setCssVars from './setCssVars';
import setPrimaryColor from './setPrimaryColor';
import setTheme from './setTheme';

export const defaultConfig: ConfigProviderProps = {
  prefixCls: 'za',
  locale: defaultLocaleData,
  theme: 'light',
  safeIphoneX: false,
  cssVars: {},
};

export const ConfigContext: Context<ConfigProviderProps> = React.createContext(defaultConfig);

let runtimeConfigContext: ConfigProviderProps;

const changeRuntimeConfigContext = (props: ConfigProviderProps) => {
  runtimeConfigContext = props;
};

const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children, cssVars, primaryColor, theme, ...rest } = props;

  changeRuntimeConfigContext(props);

  React.useEffect(() => {
    primaryColor && setPrimaryColor(primaryColor);
  }, [primaryColor]);

  React.useEffect(() => {
    theme && setTheme(theme);
  }, [theme]);

  const newChildren = setCssVars(children, cssVars!);

  return (
    <ConfigContext.Provider value={rest}>{React.Children.only(newChildren)}</ConfigContext.Provider>
  );
};

export const RuntimeConfigProvider: React.FC = ({ children }) => {
  const props = React.useRef(runtimeConfigContext);

  React.useEffect(() => {
    props.current = runtimeConfigContext;
  }, [runtimeConfigContext]);

  return <ConfigProvider {...props?.current}>{children}</ConfigProvider>;
};

ConfigProvider.displayName = 'ConfigProvider';
ConfigProvider.defaultProps = defaultConfig;

export default ConfigProvider;
