import { components, documents } from '@/site.config';
import Context from '@/utils/context';
import { pascalCase } from 'change-case';
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Menu } from 'zarm-web';
import './style.scss';

const getDocs = (docs) =>
  Object.keys(docs).map((group) => (
    <Menu.ItemGroup key={group} title={<FormattedMessage id={`app.docs.group.${group}`} />}>
      {docs[group].map((obj) => (
        <Menu.Item key={obj.key}>
          <a href={`#/docs/${obj.key}`}>
            <FormattedMessage id={`app.docs.article.${obj.key}`} />
          </a>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  ));

const getComponents = (comps, locale) =>
  Object.keys(comps).map((group) => (
    <Menu.ItemGroup
      key={group}
      title={
        <>
          <FormattedMessage id={`app.components.group.${group}`} />（{comps[group].length}）
        </>
      }
    >
      {comps[group]
        .sort((a, b) => {
          return a.key.localeCompare(b.key);
        })
        .map((obj) => (
          <Menu.Item key={obj.key}>
            <a href={`#/components/${obj.key}`}>
              <span>{group === 'hooks' ? obj.key : pascalCase(obj.key)}</span>
              {locale === 'zhCN' && <span className="chinese">{obj.name}</span>}
            </a>
          </Menu.Item>
        ))}
    </Menu.ItemGroup>
  ));

const MenuComponent = () => {
  const { locale } = useContext(Context);
  const params = useParams();
  const isComponentPage = !!useRouteMatch('/components');

  let selectedKeys;
  let menuRender;

  if (isComponentPage) {
    selectedKeys = [params.component];
    menuRender = getComponents(components, locale);
  } else {
    selectedKeys = [params.doc];
    menuRender = getDocs(documents);
  }

  return (
    <div className="menu">
      <Menu selectedKeys={selectedKeys}>{menuRender}</Menu>
    </div>
  );
};

export default MenuComponent;
