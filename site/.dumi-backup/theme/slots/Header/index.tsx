import { useLocale, useLocation, useSiteToken, useThemeConfig } from '.dumi/hooks';
import { useSiteContext } from '.dumi/hooks/useSiteContext';
import { getLocalizedPathname, isZhCNPath } from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { Col, Row } from 'antd';
import classnames from 'classnames';
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import * as React from 'react';
import { Logo } from './Logo';
import Navigation from './Navigation';
import { SwitchBtn } from './SwitchBtn';

const RESPONSIVE_XS = 1120;
const RESPONSIVE_SM = 1200;

const useStyle = () => {
  const { token } = useSiteToken();
  const searchIconColor = '#ced4d9';

  return {
    header: css`
      position: relative;
      z-index: 10;
      max-width: 100%;
      background: ${token.colorBgContainer};
      box-shadow: ${token.boxShadowTertiary};
      transition: 200ms;

      &.homepage-header {
        max-width: 1200px;
        margin: 0 auto;
        background: transparent;
        box-shadow: none;
      }

      @media only screen and (max-width: ${token.mobileMaxWidth}px) {
        text-align: center;
      }

      .nav-search-wrapper {
        display: flex;
        flex: auto;
      }

      .dumi-default-search-bar {
        border-inline-start: 1px solid rgba(0, 0, 0, 0.06);

        > svg {
          width: 14px;
          fill: ${searchIconColor};
        }

        > input {
          height: 22px;
          border: 0;

          &:focus {
            box-shadow: none;
          }

          &::placeholder {
            color: ${searchIconColor};
          }
        }

        .dumi-default-search-shortcut {
          color: ${searchIconColor};
          background-color: rgba(150, 150, 150, 0.06);
          border-color: rgba(100, 100, 100, 0.2);
          border-radius: 4px;
        }

        .dumi-default-search-popover {
          inset-inline-start: 11px;
          inset-inline-end: unset;

          &::before {
            inset-inline-start: 100px;
            inset-inline-end: unset;
          }
        }
      }
    `,
    menu: css`
      display: flex;
      align-items: center;
      margin: 0;

      > * {
        flex: none;
        margin: 0;
        margin-inline-end: 12px;

        &:last-of-type {
          margin-inline-end: 40px;
        }
      }
    `,
  };
};

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
}

const Header: React.FC = () => {
  const { header, menu } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = useSiteContext();
  const location = useLocation();
  const themeConfig = useThemeConfig();
  const { pathname, search } = location;
  const isHome = ['', '/', '/index', '/index-cn'].includes(pathname);
  const isZhCN = lang === 'cn';
  const [headerState, setHeaderState] = React.useState<HeaderState>({
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
  });

  const onLangChange = React.useCallback(() => {
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.slice(currentProtocol.length);
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        getLocalizedPathname(pathname, !isZhCNPath(window.location.pathname), search).pathname,
      );
  }, [location]);

  const { menuVisible, windowWidth, searching } = headerState;
  const docVersions: Record<string, string> = {
    [themeConfig.version]: themeConfig.version,
    ...themeConfig?.docVersions,
  };
  const versionOptions = Object.keys(docVersions).map((version) => ({
    value: docVersions[version],
    label: version,
  }));

  let responsive: null | 'narrow' | 'crowded' = null;
  if (windowWidth < RESPONSIVE_XS) {
    responsive = 'crowded';
  } else if (windowWidth < RESPONSIVE_SM) {
    responsive = 'narrow';
  }

  const headerClassName = classnames({
    'homepage-header': isHome,
  });

  const navigationNode = (
    <Navigation key="nav" isMobile={isMobile} responsive={responsive} onLangChange={onLangChange} />
  );

  const menuNode = [
    navigationNode,
    <SwitchBtn
      key="lang"
      onClick={onLangChange}
      value={isZhCNPath(pathname) ? 1 : 2}
      label1="中"
      label2="En"
      tooltip1="中文 / English"
      tooltip2="English / 中文"
    />,
  ];

  const colProps = isMobile
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        isHome
          ? { xxl: 6, xl: 6, lg: 7, md: 8, sm: 24, xs: 24 }
          : { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
        isHome
          ? { xxl: 18, xl: 18, lg: 17, md: 16, sm: 0, xs: 0 }
          : { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
      ];

  return (
    <header css={header} className={headerClassName}>
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]}>
          <Logo isZhCN={isZhCN} location={location} />
        </Col>
        <Col {...colProps[1]} css={menu}>
          <div className="nav-search-wrapper">
            <DumiSearchBar />
          </div>
          {!isMobile && menuNode}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
