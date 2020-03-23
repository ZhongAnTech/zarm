import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import { Loading } from 'zarm';
import ChangeCase from 'change-case';
import { components } from '@site/site.config';
import SentryBoundary from '@site/demo/components/SentryBoundary';
import Markdown from '@site/demo/components/Markdown';
import './style.scss';

const LoadableComponent = (component) => {
  const loader = { page: component.module };
  const compName = ChangeCase.pascalCase(component.key);

  if (component.style) {
    loader.style = () => import(`@site/demo/styles/${compName}Page`);
  }

  return Loadable.Map({
    loader,
    render: (loaded, props) => {
      return (
        <Markdown
          document={loaded.page.default}
          component={component}
          {...props}
        />
      );
    },
    loading: () => <Loading visible />,
  });
};

class App extends Component {
  render() {
    const { location } = this.props;
    const { general, form, feedback, view, navigation, other } = components;

    return (
      <SentryBoundary>
        <Suspense fallback={<Loading visible />}>
          <Switch key={location.pathname} location={location}>
            <Route exact path="/" component={lazy(() => import('@site/demo/pages/Index'))} />
            {
              [...general, ...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => (
                <Route key={+i} path={`/${component.key}`} component={LoadableComponent(component)} />
              ))
            }
            <Route component={lazy(() => import('@site/demo/pages/NotFoundPage'))} />
          </Switch>
        </Suspense>
      </SentryBoundary>
    );
  }
}

export default hot(withRouter(App));
