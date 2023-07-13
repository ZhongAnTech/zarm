import { theme } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import * as React from 'react';

const { useToken } = theme;

export const useSiteToken = () => {
  const result = useToken();
  const { getPrefixCls, iconPrefixCls } = React.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = result;

  return {
    ...result,
    token: {
      ...token,
      colorPrimary: '#00bc70',
      colorPrimaryHover: '#00bc70',
      colorPrimaryActive: '#00965f',
      colorLinkHover: '#00bc70',
      colorLinkActive: '#00965f',
      colorLink: '#00bc70',
      headerHeight: 64,
      menuItemBorder: 2,
      mobileMaxWidth: 767.99,
      siteMarkdownCodeBg: token.colorFillTertiary,
      antCls: `.${rootPrefixCls}`,
      iconCls: `.${iconPrefixCls}`,
      /** 56 */
      marginFarXS: (token.marginXXL / 6) * 7,
      /** 80 */
      marginFarSM: (token.marginXXL / 3) * 5,
      /** 96 */
      marginFar: token.marginXXL * 2,
      codeFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
    },
  };
};
