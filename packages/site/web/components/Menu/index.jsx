import React, { useContext } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { pascalCase } from 'change-case';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import Context from '@/utils/context';
import { documents, components } from '@/site.config';
import './style.scss';

const getDocs = (docs) =>
  Object.keys(docs).map((group) => ({
    type: 'group',
    key: group,
    label: <FormattedMessage id={`app.docs.group.${group}`} />,
    children: docs[group].map((obj) => ({
      key: obj.key,
      label: (
        <a href={`#/docs/${obj.key}`}>
          <FormattedMessage id={`app.docs.article.${obj.key}`} />
        </a>
      ),
    })),
  }));

const getComponents = (comps, locale) =>
  Object.keys(comps).map((group) => ({
    type: 'group',
    key: group,
    label: (
      <>
        <FormattedMessage id={`app.components.group.${group}`} />（{comps[group].length}）
      </>
    ),
    children: comps[group]
      .sort((a, b) => {
        return a.key.localeCompare(b.key);
      })
      .map((obj) => ({
        key: obj.key,
        label: (
          <a href={`#/components/${obj.key}`}>
            <span>{group === 'hooks' ? obj.key : pascalCase(obj.key)}</span>
            {locale === 'zhCN' && <span className="chinese">{obj.name}</span>}
          </a>
        ),
      })),
  }));

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
      <Menu selectedKeys={selectedKeys} items={menuRender} />
    </div>
  );
};

export default MenuComponent;
