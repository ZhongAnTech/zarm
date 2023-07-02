import { useLocale, useLocation, useSiteToken } from '.dumi/hooks';
import Logo from '.dumi/theme/slots/Logo';
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

  return (
    <header css={header} className={headerClassName}>
      <Logo isZhCN={isZhCN} location={location} />
    </header>
  );
};

export default Header;
