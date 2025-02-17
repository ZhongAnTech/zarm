import Container from '@/demo/components/Container';
import Footer from '@/demo/components/Footer';
import Locales from '@/locale';
import { components } from '@/site.config';
import Context from '@/utils/context';
import Events from '@/utils/events';
import { pascalCase } from 'change-case';
import React, { useContext, useEffect } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { List, Panel } from 'zarm';
import './style.scss';

const Child = () => {
  const history = useHistory();
  const { locale } = useContext(Context);

  const getMenus = (key) => {
    const list = components[key] || [];

    return (
      <Panel
        spacing
        title={
          <>
            <FormattedMessage id={`app.components.group.${key}`} />（{list.length}）
          </>
        }
      >
        <List>
          {list
            .sort((a, b) => {
              return a.key.localeCompare(b.key);
            })
            .map((component, i) => (
              <List.Item
                key={+i}
                title={
                  <div className="menu-item-content">
                    <span>{key === 'hooks' ? component.key : pascalCase(component.key)}</span>
                    {locale !== 'enUS' && <span className="chinese">{component.name}</span>}
                  </div>
                }
                onClick={() => history.push(`/${component.key}`)}
              />
            ))}
        </List>
      </Panel>
    );
  };

  return (
    <IntlProvider locale="zh-CN" messages={Locales[locale]}>
      <header>
        <section className="brand">
          <div className="brand-title">Zarm</div>
          <div className="brand-description">
            <FormattedMessage id="app.title" />
          </div>
        </section>
      </header>
      <main>
        {getMenus('general')}
        {getMenus('form')}
        {getMenus('feedback')}
        {getMenus('view')}
        {getMenus('navigation')}
        {getMenus('hooks')}
        {getMenus('other')}
      </main>
      <Footer />
    </IntlProvider>
  );
};

const Page = () => {
  const setPageScroll = () => {
    window.sessionStorage.indexPageScroll = window.scrollY;
  };

  const loadPageScroll = () => {
    const scrollY = window.sessionStorage.indexPageScroll;
    if (!scrollY) return;
    window.scrollTo(0, scrollY);
  };

  useEffect(() => {
    loadPageScroll();
    Events.on(window, 'scroll', setPageScroll);

    return () => {
      Events.off(window, 'scroll', setPageScroll);
    };
  }, []);

  return (
    <Container className="index-page">
      <Child />
    </Container>
  );
};

export default Page;
