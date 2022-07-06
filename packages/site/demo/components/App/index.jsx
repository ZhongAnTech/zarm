import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loading } from 'zarm';
import { pascalCase } from 'change-case';
import { components } from '@/site.config';
import Container from '@/demo/components/Container';
import Footer from '@/demo/components/Footer';
import SentryBoundary from '@/demo/components/SentryBoundary';
import Markdown from '@/demo/components/Markdown';
import './style.scss';

const LoadableComponent = (component) => {
  const loader = { page: component.module };
  const compName = pascalCase(component.key);

  if (component.style) {
    // todo: eslint字符串模版变量问题，暂时先屏蔽
    // eslint-disable-next-line
    loader.style = () => import('@/demo/styles/' + compName + 'Page');
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => {
      return (
        <Container className={`${component.key}-page`}>
          <Markdown content={loaded.page.default} component={component} {...props} />
          <Footer />
        </Container>
      );
    },
    loading: () => <Loading visible />,
  });
};

const App = () => {
  const { general, form, feedback, view, navigation, other } = components;
  return (
    <SentryBoundary>
      <Suspense fallback={<Loading visible />}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('@/demo/pages/Index'))} />
          {[...general, ...form, ...feedback, ...view, ...navigation, ...other].map(
            (component, i) => (
              <Route key={+i} path={`/${component.key}`} component={LoadableComponent(component)} />
            ),
          )}
          <Route component={lazy(() => import('@/demo/pages/NotFoundPage'))} />
        </Switch>
      </Suspense>
    </SentryBoundary>
  );
};

export default App;
