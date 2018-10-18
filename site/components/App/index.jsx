import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './style.scss';

class App extends Component {
  render() {
    return (
      // <Switch>
      //   <Route exact path="/" component={AsyncComponent(() => import('@site/pages/Index'))} />
      //   <Route path="/docs" component={AsyncComponent(() => import('@site/pages/Docs'))} />
      //   <Route component={AsyncComponent(() => import('@site/pages/NotFoundPage'))} />
      // </Switch>
      <Switch>
        <Route exact path="/" component={require('@site/pages/Index').default} />
        <Route path="/docs" component={require('@site/pages/Docs').default} />
        <Route path="*" component={require('@site/pages/NotFoundPage').default} />
      </Switch>
    );
  }
}

export default withRouter(App);
