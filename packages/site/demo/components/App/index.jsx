import Container from '@/demo/components/Container';
import Footer from '@/demo/components/Footer';
import Markdown from '@/demo/components/Markdown';
import SentryBoundary from '@/demo/components/SentryBoundary';
import { components } from '@/site.config';
import { pascalCase } from 'change-case';
import React, { lazy, Suspense } from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

const LoadableComponent = (component) => {
  const loader = { page: component.module };
  const compName = pascalCase(component.key);

  if (component.style) {
    loader.style = () => import(`@/demo/styles/${compName}Page`);
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
    loading: () => <></>,
  });
};

const App = () => {
  const { general, form, feedback, view, navigation, hooks, other } = components;
  return (
    <SentryBoundary>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={lazy(() => import('@/demo/pages/Index'))} />
          {[...general, ...form, ...feedback, ...view, ...navigation, ...hooks, ...other].map(
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
