import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { components } from '../demos';
import Format from '../utils/format';
import AsyncComponent from './AsyncComponent';
import '../styles/index';
import '../styles/components/App';

class App extends Component {
  render() {
    const { form, feedback, view, navigation } = components;
    return (
      <Switch>
        <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />
        <Route exact path="/docs" component={AsyncComponent(() => import('../pages/Docs'))} />
        {
          [...form, ...feedback, ...view, ...navigation].map((component, i) => {
            return <Route key={+i} path={`/docs/${Format.camel2Dash(component.title)}`} component={AsyncComponent(() => import(`../pages/${component.title}Page`))} />;
          })
        }
        <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
