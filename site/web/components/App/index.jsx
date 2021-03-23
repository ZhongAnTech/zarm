import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={require('@site/web/pages/Index').default} />
      <Route
        path="/components/:component"
        component={require('@site/web/pages/Components').default}
      />
      <Route path="/design/:page" component={require('@site/web/pages/Design').default} />
      <Route path="*" component={require('@site/web/pages/NotFoundPage').default} />
    </Switch>
  );
};

export default App;
