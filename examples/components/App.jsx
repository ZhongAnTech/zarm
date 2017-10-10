import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import createHistory from 'history/createHashHistory';
// import Eruda from 'eruda';
// import Events from '../utils/events';
import asyncComponent from './AsyncComponent';

import '../styles/index';
import '../styles/components/App';

const hashHistory = createHistory();

class App extends Component {

  componentDidMount() {
    // Events.on(window, 'resize', window.__setFontSize__);
    // Eruda.init();
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route
          render={({ history, location }) => {
            return (
              <CSSTransitionGroup
                transitionName={history.action === 'PUSH' ? 'left' : 'right'}
                transitionEnter
                transitionLeave
                transitionEnterTimeout={400}
                transitionLeaveTimeout={400}>
                <div key={location.pathname}>
                  <Route location={location} exact path="/" component={asyncComponent(() => import('../pages/Index'))} />

                  {/* 表单组件 */}
                  <Route location={location} path="/checkbox" component={asyncComponent(() => import('../pages/CheckboxPage'))} />
                  <Route location={location} path="/input" component={asyncComponent(() => import('../pages/InputPage'))} />
                  {/* <Route location={location} path="/picker" component={asyncComponent(() => import('../pages/PickerPage'))} /> */}
                  <Route location={location} path="/radio" component={asyncComponent(() => import('../pages/RadioPage'))} />
                  <Route location={location} path="/slider" component={asyncComponent(() => import('../pages/SliderPage'))} />
                  <Route location={location} path="/stepper" component={asyncComponent(() => import('../pages/StepperPage'))} />
                  <Route location={location} path="/switch" component={asyncComponent(() => import('../pages/SwitchPage'))} />
                  <Route location={location} path="/uploader" component={asyncComponent(() => import('../pages/UploaderPage'))} />

                  {/* 操作反馈 */}
                  <Route location={location} path="/action-sheet" component={asyncComponent(() => import('../pages/ActionSheetPage'))} />
                  <Route location={location} path="/button" component={asyncComponent(() => import('../pages/ButtonPage'))} />
                  <Route location={location} path="/modal" component={asyncComponent(() => import('../pages/ModalPage'))} />
                  <Route location={location} path="/popup" component={asyncComponent(() => import('../pages/PopupPage'))} />
                  <Route location={location} path="/pull" component={asyncComponent(() => import('../pages/PullPage'))} />
                  <Route location={location} path="/swipe-action" component={asyncComponent(() => import('../pages/SwipeActionPage'))} />
                  <Route location={location} path="/toast" component={asyncComponent(() => import('../pages/ToastPage'))} />

                  {/* 数据展示 */}
                  <Route location={location} path="/badge" component={asyncComponent(() => import('../pages/BadgePage'))} />
                  <Route location={location} path="/cell" component={asyncComponent(() => import('../pages/CellPage'))} />
                  <Route location={location} path="/icon" component={asyncComponent(() => import('../pages/IconPage'))} />
                  <Route location={location} path="/message" component={asyncComponent(() => import('../pages/MessagePage'))} />
                  <Route location={location} path="/notice-bar" component={asyncComponent(() => import('../pages/NoticeBarPage'))} />
                  <Route location={location} path="/panel" component={asyncComponent(() => import('../pages/PanelPage'))} />
                  <Route location={location} path="/progress" component={asyncComponent(() => import('../pages/ProgressPage'))} />
                  <Route location={location} path="/spinner" component={asyncComponent(() => import('../pages/SpinnerPage'))} />
                  <Route location={location} path="/swipe" component={asyncComponent(() => import('../pages/SwipePage'))} />
                  <Route location={location} path="/tab" component={asyncComponent(() => import('../pages/TabPage'))} />

                  {/* <Route location={location} component={asyncComponent(() => import('../pages/NotFoundPage'))} /> */}
                </div>
              </CSSTransitionGroup>
            );
          }}
          />
      </Router>
    );
  }
}

export default App;
