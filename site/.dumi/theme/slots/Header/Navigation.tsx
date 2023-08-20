import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { FormattedMessage, Link, useFullSidebarData, useLocation } from 'dumi';
import { useLocale, useSiteToken, useThemeConfig } from '../../../hooks';
import * as utils from '../../utils';
import type { SharedProps } from './interface';

// ============================= Theme =============================
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

// ============================= Style =============================
const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, iconCls, fontFamily, headerHeight, menuItemBorder, colorPrimary } = token;

  return {
    nav: css`
      height: 100%;
      font-size: 14px;
      font-family: Avenir, ${fontFamily}, sans-serif;
      border: 0;
      background: transparent;

      &${antCls}-menu-horizontal {
        border-bottom: none;

        & > ${antCls}-menu-item, & > ${antCls}-menu-submenu {
          min-width: ${40 + 12 * 2}px;
          height: ${headerHeight}px;
          padding-right: 12px;
          padding-left: 12px;
          line-height: ${headerHeight}px;

          &::after {
            display: none;
            // top: 0;
            // right: 12px;
            // bottom: auto;
            // left: 12px;
            // border-width: ${menuItemBorder}px;
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
    popoverMenuNav: css`
      ${antCls}-menu-item,
      ${antCls}-menu-submenu {
        text-align: left;
      }

      ${antCls}-menu-item-group-title {
        padding-left: 24px;
      }

      ${antCls}-menu-item-group-list {
        padding: 0 16px;
      }

      ${antCls}-menu-item,
      a {
        color: #333;
      }
    `,
  };
};

export interface NavigationProps extends SharedProps {
  isMobile: boolean;
  isClient: boolean;
  responsive: null | 'narrow' | 'crowded';
  directionText: string;
  onLangChange: () => void;
  onDirectionChange: () => void;
}

export default ({
  isZhCN,
  isClient,
  isMobile,
  responsive,
  directionText,
  onLangChange,
  onDirectionChange,
}: NavigationProps) => {
  const { pathname, search } = useLocation();
  const themeConfig = useThemeConfig();
  const [locale] = useLocale(locales);

  const sidebarData = useFullSidebarData();
  const blogList = sidebarData['/docs/blog']?.[0]?.children || [];

  const style = useStyle();

  const menuMode = isMobile ? 'inline' : 'horizontal';

  const module = pathname
    .split('/')
    .filter((path) => path)
    .slice(0, -1)
    .join('/');
  let activeMenuItem = module || 'home';
  if (pathname.startsWith('/guide')) {
    activeMenuItem = 'guide';
  } else if (pathname.startsWith('/resources')) {
    activeMenuItem = 'resources';
  }

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
    // {
    //   label: directionText,
    //   onClick: onDirectionChange,
    //   key: 'switch-direction',
    // },
    // ...getEcosystemGroup(),
  ];

  if (isMobile) {
    additional = additionalItems;
  } else if (responsive === 'crowded') {
    additional = [
      {
        label: <MenuOutlined />,
        key: 'additional',
        children: [...additionalItems],
      },
    ];
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={utils.getLocalizedPathname('/guide/quick-start', isZhCN, search)}>
          {locale.guide}
        </Link>
      ),
      key: 'guide',
    },
    {
      label: (
        <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
          {locale.components}
        </Link>
      ),
      key: 'components',
    },
    blogList.length
      ? {
          label: (
            <Link
              to={utils.getLocalizedPathname(
                blogList.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))[0].link,
                isZhCN,
                search,
              )}
            >
              {locale.blog}
            </Link>
          ),
          key: 'docs/blog',
        }
      : null,
    {
      label: (
        <Link to={utils.getLocalizedPathname('/resources', isZhCN, search)}>
          {locale.resources}
        </Link>
      ),
      key: 'resources',
    },
    isZhCN && isClient && window.location.host !== 'zarm.gitee.io'
      ? {
          label: (
            <a href="https://zarm.gitee.io/" target="_blank">
              国内镜像
            </a>
          ),
          key: 'mirror',
          // children: [
          //   {
          //     label: <a href="https://zarm.gitee.io/">官方镜像</a>,
          //     icon: (
          //       <img
          //         alt="logo"
          //         src={themeConfig.logo}
          //         width={16}
          //         style={{ verticalAlign: 'text-bottom' }}
          //       />
          //     ),
          //     key: 'gitee',
          //   },
          // ],
        }
      : null,
    ...(additional ?? []),
  ];

  return (
    <Menu
      mode={menuMode}
      selectedKeys={[activeMenuItem]}
      css={style.nav}
      disabledOverflow
      items={items}
      style={{ borderRight: 0 }}
    />
  );
};
