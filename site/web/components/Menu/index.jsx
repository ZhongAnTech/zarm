import React from 'react';
import { useParams } from 'react-router-dom';
import { pascalCase } from 'change-case';
import { Menu } from 'zarm-web';
import { documents, components } from '@site/site.config';
import './style.scss';

const getDocs = () => {
  return documents.map((doc) => (
    <Menu.Item
      key={doc.key}
    >
      <a href={`#/components/${doc.key}`}>{doc.name}</a>
    </Menu.Item>
  ));
};

const getMenus = (groupName, key) => {
  const list = components[key] || [];
  return (
    <Menu.ItemGroup title={groupName} key={key}>
      {
        list
          .sort((a, b) => {
            return a.key.localeCompare(b.key);
          })
          .map((component) => (
            <Menu.Item key={component.key}>
              <a href={`#/components/${component.key}`}>
                <span>{pascalCase(component.key)}</span>
                <span className="chinese">{component.name}</span>
              </a>
            </Menu.Item>
          ))
      }
    </Menu.ItemGroup>
  );
};

const MenuComponent = () => {
  const params = useParams();

  return (
    <div className="menu">
      <Menu
        defaultOpenKeys={['components', 'general', 'form', 'feedback', 'view', 'navigation', 'other']}
        selectedKeys={[params.document, params.component]}
      >
        {getDocs()}
        <Menu.SubMenu title="组件" key="components">
          {getMenus('通用', 'general')}
          {getMenus('数据录入', 'form')}
          {getMenus('数据展示', 'view')}
          {getMenus('操作反馈', 'feedback')}
          {getMenus('导航', 'navigation')}
          {getMenus('其他', 'other')}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default MenuComponent;
