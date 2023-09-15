import { useSiteToken, useThemeConfig } from '.dumi/hooks';
import * as utils from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { Link, useLocation } from 'dumi';
import * as React from 'react';

const useStyle = () => {
  const { token } = useSiteToken();

  const { headerHeight, colorTextHeading, fontFamily, mobileMaxWidth } = token;

  return {
    wrapper: css`
      margin: 0;
    `,
    logo: css`
      height: ${headerHeight}px;
      padding-inline-start: 40px;
      overflow: hidden;
      color: ${colorTextHeading};
      font-weight: bold;
      font-size: 18px;
      font-family: AlibabaPuHuiTi, ${fontFamily}, sans-serif;
      line-height: ${headerHeight}px;
      letter-spacing: -0.18px;
      white-space: nowrap;
      text-decoration: none;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: ${colorTextHeading};
      }

      img {
        height: 32px;
        vertical-align: middle;
        margin-inline-end: 12px;
      }

      @media only screen and (max-width: ${mobileMaxWidth}px) {
        padding-inline-start: 0;
        padding-inline-end: 0;
      }
    `,
    title: css`
      line-height: 32px;
    `,
  };
};

export interface LogoProps {
  isZhCN: boolean;
  location: any;
}

const Logo: React.FC<LogoProps> = ({ isZhCN }) => {
  const { search } = useLocation();
  const { wrapper, logo, title } = useStyle();
  const themeConfig = useThemeConfig();
  return (
    <h1 css={wrapper}>
      <Link to={utils.getLocalizedPathname('/', isZhCN, search)} css={logo}>
        <img src={themeConfig.logo} alt="logo" />
        <span css={title}>{themeConfig.name}</span>
      </Link>
    </h1>
  );
};

export default Logo;
