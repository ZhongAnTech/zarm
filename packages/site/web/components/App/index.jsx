import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './style.scss';

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/docs" to="/docs/about-zarm" />
      <Redirect exact from="/components" to="/components/button" />
      <Redirect exact from="/design" to="/design/download" />
      <Route exact path="/" component={require('@/web/pages/Index').default} />
      <Route path="/docs/:doc" component={require('@/web/pages/Components').default} />
      <Route path="/components/:component" component={require('@/web/pages/Components').default} />
      <Route path="/design/:page" component={require('@/web/pages/Design').default} />
      <Route path="*" component={require('@/web/pages/NotFoundPage').default} />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
