import { useLocale, useLocation } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { Link } from 'dumi';
import * as React from 'react';

const locales = {
  cn: {
    guide: '指南',
    components: '组件',
    resources: '资源',
    blog: '博客',
  },
  en: {
    guide: 'Guide',
    components: 'Components',
    resources: 'Resources',
    blog: 'Blog',
  },
};

const Navigation: React.FC = () => {
  const [locale, lang] = useLocale(locales);
  const { search } = useLocation();
  const isZhCN = lang === 'cn';

  return (
    <div>
      <Link to={getLocalizedPathname('/guide', isZhCN, search)}>{locale.guide}</Link>
      <Link to={getLocalizedPathname('/components', isZhCN, search)}>{locale.components}</Link>
      <Link to={getLocalizedPathname('/resources', isZhCN, search)}>{locale.resources}</Link>
    </div>
  );
};

export default Navigation;
