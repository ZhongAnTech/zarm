import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Loading } from 'zarm';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import FastClick from 'fastclick';
// import AsyncComponent from './AsyncComponent';
import Format from '../utils/format';
import { components } from '../demos';
import '../styles/index';
import '../styles/components/App';

const LoadableComponent = (component) => {
  return Loadable({
    loader: component,
    loading: () => <Loading visible />,
  });
};

class App extends Component {
  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // FastClick.attach(document.body);
  }

  render() {
    const { history, location, match } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const { form, feedback, view, navigation, other } = components;

    return (
      // <TransitionGroup>
      //   <CSSTransition
      //     appear
      //     key={currentKey}
      //     timeout={300}
      //     classNames={(history.action === 'PUSH' || (history.action === 'POP' && !match.isExact)) ? 'out' : 'in'}
      //   >
      //     <section>
      //       <Switch key={location.pathname} location={location}>
      //         <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />
      //         {
      //           [...form, ...feedback, ...view, ...navigation].map((component, i) => {
      //             return <Route key={+i} path={`/${Format.camel2Dash(component.title)}`} component={AsyncComponent(() => import(`../pages/${component.title}Page`))} />;
      //           })
      //         }
      //         <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
      //       </Switch>
      //     </section>
      //   </CSSTransition>
      // </TransitionGroup>
      <Switch key={location.pathname} location={location}>
        <Route exact path="/" component={LoadableComponent(() => import('../pages/Index'))} />
        {
          [...form, ...feedback, ...view, ...navigation, ...other].map((component, i) => {
            return <Route key={+i} path={`/${Format.camel2Dash(component.name)}`} component={LoadableComponent(() => import(`../pages/${component.name}Page`))} />;
          })
        }
        <Route component={LoadableComponent(() => import('../pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(hot(module)(App));
