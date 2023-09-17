import { useSiteToken } from '.dumi/hooks';
import { ConfigProvider } from 'antd';
import type { ThemeProviderProps } from 'antd-style';
import { ThemeProvider } from 'antd-style';
import type { FC } from 'react';
import React, { useContext } from 'react';

const SiteThemeProvider: FC<ThemeProviderProps> = ({ children, theme, ...rest }) => {
  const { getPrefixCls, iconPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = useSiteToken();

  React.useEffect(() => {
    ConfigProvider.config({
      theme,
    });
  }, [theme]);

  return (
    <ThemeProvider {...rest} theme={theme} customToken={token}>
      {children}
    </ThemeProvider>
  );
};

export default SiteThemeProvider;
