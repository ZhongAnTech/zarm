import { useSiteToken } from '.dumi/hooks';
import { ConfigProvider } from 'antd';
import type { ThemeProviderProps } from 'antd-style';
import { ThemeProvider } from 'antd-style';
import * as React from 'react';

const SiteThemeProvider: React.FC<ThemeProviderProps<any>> = ({ children, theme, ...rest }) => {
  const token = useSiteToken();
  React.useEffect(() => {
    ConfigProvider.config({ theme } as any);
  }, [theme]);

  return (
    <ThemeProvider {...rest} theme={theme} customToken={token}>
      {children}
    </ThemeProvider>
  );
};

export default SiteThemeProvider;
