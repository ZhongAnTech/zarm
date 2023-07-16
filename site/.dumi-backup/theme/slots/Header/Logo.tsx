import { useLocation, useSiteToken, useThemeConfig } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { Link, useSiteData } from 'dumi';
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
      cursor: pointer;
      margin-left: 40px;

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
      sup {
        color: #999;
        font-size: 12px;
        margin-left: 4px;
      }
    `,
  };
};

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

export const Logo: React.FC<LogoProps> = ({ isZhCN }) => {
  const { search } = useLocation();
  const { logo, title } = useStyle();
  const { pkg } = useSiteData();
  const themeConfig = useThemeConfig();

  const version = themeConfig.version || pkg.version;

  return (
    <h1>
      <Link to={getLocalizedPathname('/', isZhCN, search)} css={logo}>
        {isString(themeConfig.logo) && <img src={themeConfig.logo} alt="logo" />}
        <span css={title}>
          {themeConfig.name}
          {version && <sup>v{version}</sup>}
        </span>
      </Link>
    </h1>
  );
};
