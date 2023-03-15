import { IconContext } from '@zarm-design/icons';
import type { Context } from 'react';
import * as React from 'react';
import type { ConfigProviderProps } from './interface';
import defaultLocaleData from './locale/zh_CN';
import setCssVars from './setCssVars';
import setPrimaryColor from './setPrimaryColor';
import setTheme from './setTheme';

export const defaultConfig: ConfigProviderProps = {
  prefixCls: 'za',
  locale: defaultLocaleData,
  theme: 'light',
  safeArea: true,
  cssVars: {},
  mountContainer: () => document.body,
  scrollContainer: () => window,
};

export const ConfigContext: Context<ConfigProviderProps> = React.createContext(defaultConfig);

let runtimeConfigContext: ConfigProviderProps = defaultConfig;

const changeRuntimeConfigContext = (props: ConfigProviderProps) => {
  runtimeConfigContext = props;
};

export const getRuntimeConfig = () => runtimeConfigContext;

const ConfigProvider: React.FC<React.PropsWithChildren<ConfigProviderProps>> = (props) => {
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
    <ConfigContext.Provider value={rest}>
      <IconContext.Provider value={{ prefixCls: rest.prefixCls }}>
        {React.Children.only(newChildren)}
      </IconContext.Provider>
    </ConfigContext.Provider>
  );
};

export const RuntimeConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const props = React.useRef(runtimeConfigContext);

  React.useEffect(() => {
    props.current = runtimeConfigContext;
  }, [runtimeConfigContext]);

  return <ConfigProvider {...props?.current}>{children}</ConfigProvider>;
};

ConfigProvider.displayName = 'ConfigProvider';
ConfigProvider.defaultProps = defaultConfig;

export default ConfigProvider;
