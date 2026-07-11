import Container from '@/demo/components/Container';
import Footer from '@/demo/components/Footer';
import Markdown from '@/demo/components/Markdown';
import SentryBoundary from '@/demo/components/SentryBoundary';
import { components } from '@/site.config';
import { pascalCase } from 'change-case';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Toast } from 'zarm';
import './style.scss';

const Loading = () => {
  React.useEffect(() => {
    const { close } = Toast.show({ icon: 'loading', duration: 0 });
    return () => {
      close?.();
    };
  }, []);

  return null;
};

const LoadableComponent = (component) => {
  const compName = pascalCase(component.key);
  const LazyComponent = lazy(() =>
    Promise.all([
      component.module(),
      component.style ? import(`@/demo/styles/${compName}Page`) : Promise.resolve(),
    ]).then(([page]) => ({
      default: (props) => (
        <Container className={`${component.key}-page`}>
          <Markdown content={page.default} component={component} {...props} />
          <Footer />
        </Container>
      ),
    })),
  );

  return (props) => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const App = () => {
  const { general, form, feedback, view, navigation, hooks, other } = components;
  return (
    <SentryBoundary>
      <Suspense fallback={<Loading />}>
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
