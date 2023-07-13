import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
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

const Header: React.FC = () => {
  const { header, menu } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = useSiteContext();
  const location = useLocation();
  const { pathname, search } = location;
  const isHome = ['', 'index', 'index-cn'].includes(location.pathname);
  const isZhCN = lang === 'cn';

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

  const headerClassName = classnames({
    'homepage-header': isHome,
  });

  const navigationNode = <Navigation key="nav" />;

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

  const colProps = isHome
    ? [{ flex: 'none' }, { flex: 'auto' }]
    : [
        { xxl: 4, xl: 5, lg: 6, md: 6, sm: 24, xs: 24 },
        { xxl: 20, xl: 19, lg: 18, md: 18, sm: 0, xs: 0 },
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
