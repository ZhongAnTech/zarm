import { useLocation, useSiteToken, useThemeConfig } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { Link } from 'dumi';
import isString from 'lodash/isString';
import * as React from 'react';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    logo: css`
      height: ${token.headerHeight}px;
      overflow: hidden;
      color: ${token.colorTextHeading};
      font-weight: bold;
      font-size: 18px;
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      line-height: ${token.headerHeight}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: ${token.colorTextHeading};
      }

      img {
        height: 32px;
        vertical-align: middle;
        margin-inline-end: 12px;
      }

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,
    title: css`
      line-height: 32px;
      font-weight: 500;
    `,
    version: css`
      color: #999;
      font-size: 12px;
      margin-left: 4px;
    `,
  };
};

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const Logo: React.FC<LogoProps> = ({ isZhCN }) => {
  const { search } = useLocation();
  const { logo, title, version } = useStyle();
  const themeConfig = useThemeConfig();

  return (
    <h1>
      <Link to={getLocalizedPathname('/', isZhCN, search)} css={logo}>
        {isString(themeConfig.logo) && <img src={themeConfig.logo} alt="logo" />}
        <span css={title}>
          {themeConfig.name}
          {themeConfig.version && <sup css={version}>v{themeConfig.version}</sup>}
        </span>
      </Link>
    </h1>
  );
};

export default Logo;
