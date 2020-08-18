import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { pascalCase } from 'change-case';
import { Menu } from 'zarm-web';
import { FormattedMessage } from 'react-intl';
import Context from '@site/utils/context';
import { documents, components } from '@site/site.config';
import './style.scss';

const getDocs = (lang) => {
  return documents.map((doc) => (
    <Menu.Item
      key={doc.key}
    >
      <a href={`#/components/${doc.key}`}>{lang === 'zhCN' ? doc.name : pascalCase(doc.key)}</a>
    </Menu.Item>
  ));
};

const getMenus = (lang, key) => {
  const list = components[key] || [];
  return (
    <Menu.ItemGroup title={<FormattedMessage id={`app.components.type.${key}`} />} key={key}>
      {
        list
          .sort((a, b) => {
            return a.key.localeCompare(b.key);
          })
          .map((component) => (
            <Menu.Item key={component.key}>
              <a href={`#/components/${component.key}`}>
                <span>{pascalCase(component.key)}</span>
                {lang === 'zhCN' && <span className="chinese">{component.name}</span>}
              </a>
            </Menu.Item>
          ))
      }
    </Menu.ItemGroup>
  );
};

const MenuComponent = () => {
  const params = useParams();
  const { lang } = useContext(Context);

  return (
    <div className="menu">
      <Menu
        defaultOpenKeys={['components', 'general', 'form', 'feedback', 'view', 'navigation', 'other']}
        selectedKeys={[params.document, params.component]}
      >
        {getDocs(lang)}
        <Menu.SubMenu title={<FormattedMessage id="app.components" />} key="components">
          {getMenus(lang, 'general')}
          {getMenus(lang, 'form')}
          {getMenus(lang, 'view')}
          {getMenus(lang, 'feedback')}
          {getMenus(lang, 'navigation')}
          {getMenus(lang, 'other')}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default MenuComponent;
