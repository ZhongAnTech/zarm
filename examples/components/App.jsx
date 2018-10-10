import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import FastClick from 'fastclick';
import Format from '../utils/format';
import { form, feedback, view, navigation } from '../demos';
import AsyncComponent from './AsyncComponent';
import '../styles/index';
import '../styles/components/App';

class App extends Component {
  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // FastClick.attach(document.body);
  }

  render() {
    const { history, location, match } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
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
        <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />
        {
          [...form, ...feedback, ...view, ...navigation].map((component, i) => {
            return <Route key={+i} path={`/${Format.camel2Dash(component.title)}`} component={AsyncComponent(() => import(`../pages/${component.title}Page`))} />;
          })
        }
        <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
      </Switch>
    );
  }
}

export default withRouter(App);
