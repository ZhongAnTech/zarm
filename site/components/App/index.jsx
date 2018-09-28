import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import AsyncComponent from '@site/components/AsyncComponent';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncComponent(() => import('@site/pages/Index'))} />
        <Route path="/docs" component={AsyncComponent(() => import('@site/pages/Docs'))} />
        <Route component={AsyncComponent(() => import('@site/pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
