import { useLocale, useLocation, useSiteContext, useSiteToken } from '.dumi/hooks';
import { getLocalizedPathname } from '.dumi/theme/utils';
import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Menu, MenuProps } from 'antd';
import { FormattedMessage, Link } from 'dumi';
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

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls, fontFamily, headerHeight, menuItemBorder, colorPrimary } = token;

  return {
    nav: css`
      height: 100%;
      font-size: 14px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: ${40 + 12 * 2}px;
          height: ${headerHeight}px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: ${headerHeight}px;

          &::after {
            top: 0;
            right: 12px;
            bottom: auto;
            left: 12px;
            border-width: ${menuItemBorder}px;
          }
        }

        & ${antCls}-menu-submenu-title ${iconCls} {
          margin: 0;
        }

        & > ${antCls}-menu-item-selected {
          a {
            color: ${colorPrimary};
          }
        }
      }

      & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
        text-align: center;
      }
    `,
  };
};

export interface NavigationProps {
  isMobile: boolean;
  responsive: null | 'narrow' | 'crowded';
  onLangChange: () => void;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const { responsive, onLangChange } = props;
  const [locale, lang] = useLocale(locales);
  const { nav } = useStyle();
  const { search, pathname } = useLocation();
  const isZhCN = lang === 'cn';
  const { isMobile } = useSiteContext();
  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname
    .split('/')
    .filter((path) => path)
    .slice(0, -1)
    .join('/');

  const activeMenuItem = module || 'home';

  let additional: MenuProps['items'];

  const additionalItems: MenuProps['items'] = [
    {
      label: (
        <a href="https://github.com/zhongAnTech/zarm" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      ),
      key: 'github',
    },
    {
      label: <FormattedMessage id="app.header.lang" />,
      onClick: onLangChange,
      key: 'switch-lang',
    },
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      {
        key: 'additional',
        label: <MenuOutlined />,
        children: [...additionalItems],
      },
    ];
  }

  const items: MenuProps['items'] = [
    {
      key: '/guide/quick-start',
      label: (
        <Link to={getLocalizedPathname('/guide/quick-start', isZhCN, search)}>
          <Button type="text">{locale.guide}</Button>
        </Link>
      ),
    },
    {
      key: '/components/overview',
      label: (
        <Link to={getLocalizedPathname('/components/overview', isZhCN, search)}>
          <Button type="text">{locale.components}</Button>
        </Link>
      ),
    },
    {
      key: '/resources',
      label: (
        <Link to={getLocalizedPathname('/resources', isZhCN, search)}>
          <Button type="text">{locale.resources}</Button>
        </Link>
      ),
    },
    ...(additional ?? []),
  ];
  return (
    <Menu
      css={nav}
      selectedKeys={[activeMenuItem]}
      mode={menuMode}
      items={items}
      style={{ borderRight: 0 }}
      disabledOverflow
    />
  );
};

export default Navigation;
