import { useLocale, useLocation } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { Button, Space } from 'antd';
import { Link } from 'dumi';
// import { Button } from 'dumi';
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
      <Space>
        <Link to={getLocalizedPathname('/guide/quick-start', isZhCN, search)}>
          <Button type="text">{locale.guide}</Button>
        </Link>
        <Link to={getLocalizedPathname('/components/overview', isZhCN, search)}>
          <Button type="text">{locale.components}</Button>
        </Link>
        <Link to={getLocalizedPathname('/resources', isZhCN, search)}>
          <Button type="text">{locale.resources}</Button>
        </Link>
      </Space>
    </div>
  );
};

export default Navigation;
