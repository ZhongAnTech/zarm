import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import Loadable from 'react-loadable';
import './style.scss';

// const LoadableComponent = (component) => {
//   return Loadable({
//     loader: component,
//     loading: () => null,
//   });
// };

class App extends Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/" component={LoadableComponent(() => import('@site/pages/Index'))} />
        <Route path="/docs" component={LoadableComponent(() => import('@site/pages/Docs'))} />
        <Route path="*" component={LoadableComponent(() => import('@site/pages/NotFoundPage'))} /> */}
        <Route exact path="/" component={require('@site/pages/Index').default} />
        <Route path="/documents/:document" component={require('@site/pages/Documents').default} />
        <Route path="/components/:component" component={require('@site/pages/Components').default} />
        {/* <Redirect from="/docs" to="/docs/quick-start" /> */}
        <Route path="*" component={require('@site/pages/NotFoundPage').default} />
      </Switch>
    );
  }
}

export default withRouter(App);
