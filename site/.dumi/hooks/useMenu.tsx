import Link from '.dumi/theme/common/Link';
import type { MenuProps } from 'antd';
import { Tag, theme } from 'antd';
import { useFullSidebarData, useSidebarData } from 'dumi';
import React, { useMemo } from 'react';
import { useLocation } from './useLocation';

export interface UseMenuOptions {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export const useMenu = (options: UseMenuOptions = {}): [MenuProps['items'], string] => {
  const fullData = useFullSidebarData();
  const { pathname, search } = useLocation();
  const sidebarData = useSidebarData();
  const { before, after } = options;
  const { token } = theme.useToken();

  const menuItems = useMemo<MenuProps['items']>(() => {
    const sidebarItems = [...(sidebarData ?? [])];

    return (
      sidebarItems?.reduce<Exclude<MenuProps['items'], undefined>>((result, group) => {
        if (group?.title) {
          result.push({
            type: 'group',
            label: group?.title,
            key: group?.title,
            children: group.children?.map((item) => ({
              label: (
                <Link to={`${item.link}${search}`}>
                  {before}
                  <span key="english">{item?.title}</span>
                  <span className="chinese" key="chinese">
                    {(item.frontmatter as any).subtitle}
                  </span>
                  {(item.frontmatter as any).tag && (
                    <Tag color="warning" style={{ marginInlineStart: token.marginXS }}>
                      {(item.frontmatter as any).tag}
                    </Tag>
                  )}
                  {after}
                </Link>
              ),
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          });
        } else {
          const list = group.children || [];
          if (list.every((info) => info?.frontmatter?.date)) {
            list.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
          }

          result.push(
            ...list.map((item) => ({
              label: (
                <Link to={`${item.link}${search}`}>
                  {before}
                  {item?.title}
                  {after}
                </Link>
              ),
              key: item.link.replace(/(-cn$)/g, ''),
            })),
          );
        }
        return result;
      }, []) ?? []
    );
  }, [sidebarData, fullData, pathname, search, options]);

  return [menuItems, pathname];
};
