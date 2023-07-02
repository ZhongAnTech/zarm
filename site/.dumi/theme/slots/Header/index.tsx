import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
import Logo from '.dumi/theme/slots/Logo';
import Navigation from '.dumi/theme/slots/Navigation';
import { css } from '@emotion/react';
import classnames from 'classnames';
import { useOutlet } from 'dumi';
import * as React from 'react';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    header: css`
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      flex-flow: nowrap;
      justify-content: space-between;
      align-items: center;
      display: flex;
    `,
  };
};

const Header: React.FC = () => {
  const { header } = useStyle();
  const outlet = useOutlet();
  const [, lang] = useLocale();
  const location = useLocation();
  const isZhCN = lang === 'cn';

  const isHome = ['', 'index', 'index-cn'].includes(location.pathname);

  const headerClassName = classnames({
    'homepage-header': isHome,
  });

  const navigationNode = <Navigation key="nav" />;

  const menu = [navigationNode];

  return (
    <header css={header} className={headerClassName}>
      <Logo isZhCN={isZhCN} location={location} />
      {menu}
    </header>
  );
};

export default Header;
