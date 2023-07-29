import { useLocation, useThemeConfig } from '.dumi/hooks';
import { Common } from '.dumi/theme/common/styles';
import { clearPath } from '.dumi/theme/utils';
import { demos, filesMeta } from '@@/dumi/meta';
import { css } from '@emotion/react';
import { Helmet, useFullSidebarData, useNavigate } from 'dumi';
import * as React from 'react';
import { COMPONENT_PATH, GALLERY_PATH } from './constants';
import { Reset } from './styles';

const useStyle = () => ({
  header: css`
    padding: 16px;
  `,
  title: css`
    font-size: 16px;
  `,
  footer: css`
    color: #ccc;
    font-size: 14px;
    padding: 32px 0 48px;
    justify-content: center;
    display: flex;
  `,
});

const componentMetaMap = Object.entries(filesMeta).reduce(
  (memo: Record<string, { key: string; tabs?: string[] }>, [key, meta]) => {
    if (meta?.frontmatter?.filename) {
      memo[meta.frontmatter.filename] = { key };
    }
    return memo;
  },
  {},
);

console.log(demos);

const componentsByRouteId = Object.values(demos).reduce(
  (memo: Record<string, React.ReactElement[]>, demo: Record<string, any>) => {
    if (demo?.routeId) {
      const source = memo[demo.routeId];
      const components = Array.isArray(source) ? source : [];
      memo[demo.routeId] = components.concat(demo.component);
    }
    return memo;
  },
  {},
);

const useComponent = () => {
  const { pathname } = useLocation();
  const siderbars = useFullSidebarData();
  const groups = siderbars[COMPONENT_PATH];

  const components = groups.reduce((memo, group) => {
    group.children.forEach((component) => {
      const path = clearPath(component.link).replace(COMPONENT_PATH, GALLERY_PATH);
      const filename = component.frontmatter.filename;
      const route = componentMetaMap[filename];

      memo[path] = {
        title: component.frontmatter.title,
        tabs: route.tabs,
        components: componentsByRouteId[route.key],
      };
    });
    return memo;
  }, {});

  return components[pathname];
};

const Page: React.FC = () => {
  const { header, title, footer } = useStyle();
  const navigate = useNavigate();
  const themeConfig = useThemeConfig();
  const finded = useComponent();

  return (
    <>
      <Helmet>
        <title>{themeConfig.name}</title>
      </Helmet>
      <Common />
      <Reset />

      <header css={header}>
        <div css={title}>{finded?.title}</div>
      </header>

      <main>
        <React.Suspense>
          {finded?.components?.map((Component) => (
            <Component />
          ))}
        </React.Suspense>
      </main>

      <footer css={footer}>众安·体验设计中心</footer>
    </>
  );
};

export default Page;
