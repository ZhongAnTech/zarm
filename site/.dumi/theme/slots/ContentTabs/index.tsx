import { Tabs } from 'antd';
import { useRouteMeta } from 'dumi';
import type { IContentTabsProps } from 'dumi/theme-default/slots/ContentTabs';
import type { TabsProps } from 'rc-tabs';
import type { FC, ReactNode } from 'react';

const titleMap: Record<string, string> = {
  mini: '小程序',
};

const iconMap: Record<string, ReactNode> = {};

const ContentTabs: FC<IContentTabsProps> = ({ tabs, tabKey, onChange }) => {
  const meta = useRouteMeta();

  if (!meta.tabs) {
    return null;
  }

  const items: TabsProps['items'] = [
    {
      label: <span>Web</span>,
      key: 'web',
    },
  ];

  tabs?.forEach((tab) => {
    items.push({
      label: (
        <span>
          {iconMap[tab.key]}
          {titleMap[tab.key]}
        </span>
      ),
      key: tab.key,
    });
  });

  return (
    <Tabs
      items={items}
      activeKey={tabKey || 'web'}
      onChange={(key) => onChange(tabs.find((tab) => tab.key === key))}
      style={{ margin: '32px 0 -16px' }}
    />
  );
};

export default ContentTabs;
