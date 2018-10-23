import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import './style.scss';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => null,
  });
};

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoadableComponent(() => import('@site/pages/Index'))} />
        <Route path="/docs" component={LoadableComponent(() => import('@site/pages/Docs'))} />
        <Route path="*" component={LoadableComponent(() => import('@site/pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
