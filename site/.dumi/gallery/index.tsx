import { useLocale, useLocation, useThemeConfig } from '.dumi/hooks';
import { Common } from '.dumi/theme/common/styles';
import * as utils from '.dumi/theme/utils';
import { css } from '@emotion/react';
import { useDebounceEffect } from 'ahooks';
import { Helmet, useNavigate } from 'dumi';
import cloneDeep from 'lodash/cloneDeep';
import * as React from 'react';
import { List, Panel, SearchBar } from 'zarm';
import { COMPONENT_PATH, GALLERY_PATH } from './constants';
import { useGroups } from './hooks';
import { Reset } from './styles';

const useStyle = () => ({
  gallery: css``,
  header: css`
    padding: 32px 32px 16px;
  `,
  title: css`
    font-size: 32px;
  `,
  description: css`
    font-size: 14px;
  `,
  footer: css`
    color: #ccc;
    font-size: 14px;
    padding: 32px 0 48px;
    justify-content: center;
    display: flex;
  `,
});

const locales = {
  cn: {
    description: '追求极致的用户体验，做有温度的组件库',
    search: '搜索组件',
  },
  en: {
    description: 'Pursue the ultimate user experience and build a component library with warmth',
    search: 'search component',
  },
};

const Gallery: React.FC = () => {
  const { gallery, header, title, description, footer } = useStyle();
  const [locale, lang] = useLocale(locales);
  const { search } = useLocation();
  const isZhCN = lang === 'cn';
  const navigate = useNavigate();
  const themeConfig = useThemeConfig();
  const groups = useGroups();
  const [componentGroups, setComponentGroups] = React.useState(groups);
  const [keyword, setKeyword] = React.useState('');

  useDebounceEffect(
    () => {
      let filterGroups = cloneDeep(groups);
      filterGroups.forEach((group) => {
        group.children = group.children.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase()),
        );
      });

      setComponentGroups(filterGroups.filter((group) => group.children.length));
    },
    [keyword],
    {
      wait: 200,
      leading: false,
      trailing: true,
    },
  );

  return (
    <>
      <Helmet>
        <title>{themeConfig.name}</title>
      </Helmet>
      <Common />
      <Reset />

      <header css={header}>
        <div css={title}>{themeConfig.name}</div>
        <div css={description}>{locale.description}</div>
      </header>

      <Panel spacing>
        <SearchBar
          placeholder={locale.search}
          shape="round"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </Panel>

      {componentGroups.map((group) => (
        <Panel key={group.title} title={group.title} spacing>
          <List>
            {group.children.map((component) => (
              <List.Item
                onClick={() =>
                  navigate(
                    utils.getLocalizedPathname(
                      component.link.replace(COMPONENT_PATH, GALLERY_PATH),
                      isZhCN,
                      search,
                    ),
                  )
                }
                hasArrow
              >
                {component.title}
              </List.Item>
            ))}
          </List>
        </Panel>
      ))}
      <footer css={footer}>众安·体验设计中心</footer>
    </>
  );
};

export default Gallery;
