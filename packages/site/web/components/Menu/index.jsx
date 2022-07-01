import React, { useContext } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { pascalCase } from 'change-case';
import { Menu } from 'zarm-web';
import { FormattedMessage } from 'react-intl';
import Context from '@/utils/context';
import { documents, components } from '@/site.config';
import './style.scss';

const getDocs = (locale) => {
  return documents.map((doc) => (
    <Menu.Item key={doc.key}>
      <a href={`#/docs/${doc.key}`}>{locale === 'zhCN' ? doc.name : pascalCase(doc.key)}</a>
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
  const isComponentPage = !!useRouteMatch('/components');
  const { locale } = useContext(Context);

  let selectedKeys = [params.doc];
  if (isComponentPage) {
    selectedKeys = [params.component];
  }

  const menuRender = () => {
    if (isComponentPage) {
      return (
        <>
          {getMenus(locale, 'general')}
          {getMenus(locale, 'form')}
          {getMenus(locale, 'view')}
          {getMenus(locale, 'feedback')}
          {getMenus(locale, 'navigation')}
          {getMenus(locale, 'other')}
        </>
      );
    }

    return getDocs(locale);
  };

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
        selectedKeys={selectedKeys}
      >
        {menuRender()}
      </Menu>
    </div>
  );
};

export default MenuComponent;
