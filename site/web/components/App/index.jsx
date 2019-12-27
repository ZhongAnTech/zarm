import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
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
        <Route path="/components/:component" component={LoadableComponent(() => import('@site/pages/Components'))} />
        <Route path="*" component={LoadableComponent(() => import('@site/pages/NotFoundPage'))} /> */}
        <Route exact path="/" component={require('@site/web/pages/Index').default} />
        <Route path="/components/:component" component={require('@site/web/pages/Components').default} />
        <Route path="/design/:page" component={require('@site/web/pages/Design').default} />
        <Route path="*" component={require('@site/web/pages/NotFoundPage').default} />
      </Switch>
    );
  }
}

export default hot(withRouter(App));
