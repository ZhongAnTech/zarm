import { GithubOutlined, MenuOutlined } from '@ant-design/icons';
import { ClassNames, css } from '@emotion/react';
import { Col, Popover, Row, Select } from 'antd';
import classNames from 'classnames';
import { useLocation, useSiteData } from 'dumi';
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocale, useSiteToken, useThemeConfig } from '../../../hooks';
import * as utils from '../../utils';
import type { SiteContextProps } from '../SiteContext';
import { SiteContext } from '../SiteContext';
import Logo from './Logo';
import Navigation from './Navigation';
import SwitchBtn from './SwitchBtn';
import type { SharedProps } from './interface';

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

      &.home-header {
        max-width: 1200px;
        background: transparent;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        margin: 0 auto;
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
    menuRow: css`
      display: flex;
      align-items: center;
      margin: 0;

      > * {
        flex: none;
        margin: 0;
        margin-inline-end: 12px;

        &:last-child {
          margin-inline-end: 40px;
        }
      }
    `,
    dataDirectionIcon: css`
      width: 16px;
    `,
    popoverMenu: {
      width: 300,

      [`${token.antCls}-popover-inner-content`]: {
        padding: 0,
      },
    },
  };
};

interface HeaderState {
  menuVisible: boolean;
  windowWidth: number;
  searching: boolean;
}

// ================================= Header =================================
const Header: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [, lang] = useLocale();

  const { pkg } = useSiteData();
  const themeConfig = useThemeConfig();
  const [headerState, setHeaderState] = useState<HeaderState>({
    menuVisible: false,
    windowWidth: 1400,
    searching: false,
  });
  const { direction, isMobile, updateSiteConfig } = useContext<SiteContextProps>(SiteContext);
  const location = useLocation();
  const { pathname, search } = location;

  const style = useStyle();

  const handleHideMenu = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, menuVisible: false }));
  }, []);
  const onWindowResize = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, windowWidth: window.innerWidth }));
  }, []);
  const handleShowMenu = useCallback(() => {
    setHeaderState((prev) => ({ ...prev, menuVisible: true }));
  }, []);
  const onMenuVisibleChange = useCallback((visible: boolean) => {
    setHeaderState((prev) => ({ ...prev, menuVisible: visible }));
  }, []);
  const onDirectionChange = () => {
    updateSiteConfig({ direction: direction !== 'rtl' ? 'rtl' : 'ltr' });
  };

  useEffect(() => {
    handleHideMenu();
  }, [location]);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
  }, []);

  // eslint-disable-next-line class-methods-use-this
  const handleVersionChange = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  const onLangChange = useCallback(() => {
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.slice(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname), search).pathname,
      );
  }, [location]);

  const nextDirectionText = useMemo<string>(
    () => (direction !== 'rtl' ? 'RTL' : 'LTR'),
    [direction],
  );

  const getDropdownStyle = useMemo<React.CSSProperties>(
    () => (direction === 'rtl' ? { direction: 'ltr', textAlign: 'right' } : {}),
    [direction],
  );

  const { menuVisible, windowWidth, searching } = headerState;
  const docVersions: Record<string, string> = {
    [pkg.version]: pkg.version,
    [themeConfig.version]: themeConfig.version,
    ...themeConfig?.docVersions,
  };

  const versionOptions = Object.entries(docVersions)
    .filter(([, value]) => value)
    .map(([version, url]) => ({
      value: url,
      label: version,
    }));

  const isHome = ['', '/', '/index', '/index-cn'].includes(pathname);
  const isZhCN = lang === 'cn';
  const isRTL = direction === 'rtl';
  let responsive: null | 'narrow' | 'crowded' = null;
  if (windowWidth < RESPONSIVE_XS) {
    responsive = 'crowded';
  } else if (windowWidth < RESPONSIVE_SM) {
    responsive = 'narrow';
  }

  const headerClassName = classNames({
    clearfix: true,
    'home-header': isHome,
  });

  const sharedProps: SharedProps = {
    isZhCN,
    isRTL,
    isClient,
  };

  const navigationNode = (
    <Navigation
      key="nav"
      {...sharedProps}
      responsive={responsive}
      isMobile={isMobile}
      directionText={nextDirectionText}
      onLangChange={onLangChange}
      onDirectionChange={onDirectionChange}
    />
  );

  let menu = [
    navigationNode,
    ...(versionOptions.length
      ? [
          <Select
            key="version"
            className="version"
            size="small"
            defaultValue={versionOptions[0].value}
            onChange={handleVersionChange}
            dropdownStyle={getDropdownStyle}
            popupMatchSelectWidth={false}
            getPopupContainer={(trigger) => trigger.parentNode}
            options={versionOptions}
          />,
        ]
      : []),
    // <More key="more" {...sharedProps} />,
    <SwitchBtn
      key="lang"
      onClick={onLangChange}
      value={utils.isZhCN(pathname) ? 1 : 2}
      label1="中"
      label2="En"
      tooltip1="中文 / English"
      tooltip2="English / 中文"
    />,
    // <SwitchBtn
    //   key="direction"
    //   onClick={onDirectionChange}
    //   value={direction === 'rtl' ? 2 : 1}
    //   label1={<DirectionIcon css={style.dataDirectionIcon} direction="ltr" />}
    //   tooltip1="LTR"
    //   label2={<DirectionIcon css={style.dataDirectionIcon} direction="rtl" />}
    //   tooltip2="RTL"
    //   pure
    // />,
    <a key="github" href="https://github.com/ZhongAnTech/zarm" target="_blank" rel="noreferrer">
      <SwitchBtn value={1} label1={<GithubOutlined />} tooltip1="Github" label2={null} pure />
    </a>,
  ];

  if (windowWidth < RESPONSIVE_XS) {
    menu = searching ? [] : [navigationNode];
  } else if (windowWidth < RESPONSIVE_SM) {
    menu = searching ? [] : menu;
  }

  const colProps = [
    { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
    { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
  ];

  return (
    <header css={style.header} className={headerClassName}>
      {isMobile && (
        <ClassNames>
          {({ css: cssFn }) => (
            <Popover
              overlayClassName={cssFn(style.popoverMenu)}
              placement="bottomRight"
              content={menu}
              trigger="click"
              open={menuVisible}
              arrow={{ arrowPointAtCenter: true }}
              onOpenChange={onMenuVisibleChange}
            >
              <MenuOutlined className="nav-phone-icon" onClick={handleShowMenu} />
            </Popover>
          )}
        </ClassNames>
      )}
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <Col {...colProps[0]}>
          <Logo {...sharedProps} location={location} />
        </Col>
        <Col {...colProps[1]} css={style.menuRow}>
          <div className="nav-search-wrapper">
            <DumiSearchBar />
          </div>
          {!isMobile && menu}
        </Col>
      </Row>
    </header>
  );
};

export default Header;
