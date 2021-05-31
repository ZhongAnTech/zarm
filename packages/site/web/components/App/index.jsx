import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={require('@/web/pages/Index').default} />
      <Route path="/docs/:doc" component={require('@/web/pages/Components').default} />
      <Route path="/components/:component" component={require('@/web/pages/Components').default} />
      <Route path="/design/:page" component={require('@/web/pages/Design').default} />
      <Route path="*" component={require('@/web/pages/NotFoundPage').default} />
    </Switch>
  );
};

export default App;
