import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { pascalCase } from 'change-case';
import { Menu } from 'zarm-web';
import { FormattedMessage } from 'react-intl';
import Context from '@site/utils/context';
import { documents, components } from '@site/site.config';
import './style.scss';

const getDocs = (locale) => {
  return documents.map((doc) => (
    <Menu.Item key={doc.key}>
      <a href={`#/components/${doc.key}`}>{locale === 'zhCN' ? doc.name : pascalCase(doc.key)}</a>
    </Menu.Item>
  ));
};

const getMenus = (locale, key) => {
  const list = components[key] || [];
  return (
    <Menu.ItemGroup title={<FormattedMessage id={`app.components.type.${key}`} />} key={key}>
      {list
        .sort((a, b) => {
          return a.key.localeCompare(b.key);
        })
        .map((component) => (
          <Menu.Item key={component.key}>
            <a href={`#/components/${component.key}`}>
              <span>{pascalCase(component.key)}</span>
              {locale === 'zhCN' && <span className="chinese">{component.name}</span>}
            </a>
          </Menu.Item>
        ))}
    </Menu.ItemGroup>
  );
};

const MenuComponent = () => {
  const params = useParams();
  const { locale } = useContext(Context);

  return (
    <div className="menu">
      <Menu
        defaultOpenKeys={[
          'components',
          'general',
          'form',
          'feedback',
          'view',
          'navigation',
          'other',
        ]}
        selectedKeys={[params.document, params.component]}
      >
        {getDocs(locale)}
        <Menu.SubMenu title={<FormattedMessage id="app.components" />} key="components">
          {getMenus(locale, 'general')}
          {getMenus(locale, 'form')}
          {getMenus(locale, 'view')}
          {getMenus(locale, 'feedback')}
          {getMenus(locale, 'navigation')}
          {getMenus(locale, 'other')}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default MenuComponent;
