import { theme } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import { useContext } from 'react';

const { useToken } = theme;

export const useSiteToken = () => {
  const result = useToken();
  const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = result;
  const siteMarkdownCodeBg = token.colorFillTertiary;

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
      controlItemBgActive: 'rgba(0, 188, 112, 0.1)',
      headerHeight: 64,
      menuItemBorder: 2,
      mobileMaxWidth: 767.99,
      siteMarkdownCodeBg,
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
