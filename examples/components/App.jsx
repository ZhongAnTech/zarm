import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import createHistory from 'history/createHashHistory';
// import Eruda from 'eruda';
// import Events from '../utils/events';
import AsyncComponent from './AsyncComponent';

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
          render={(props) => {
            const { history, location, match } = props;
            return (
              <CSSTransitionGroup
                transitionName={(history.action === 'PUSH' || (history.action === 'POP' && !match.isExact)) ? 'left' : 'right'}
                transitionEnter
                transitionLeave
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <div key={location.pathname}>
                  <Route location={location} exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />

                  {/* 表单组件 */}
                  <Route location={location} path="/checkbox" component={AsyncComponent(() => import('../pages/CheckboxPage'))} />
                  <Route location={location} path="/input" component={AsyncComponent(() => import('../pages/InputPage'))} />
                  <Route location={location} path="/picker" component={AsyncComponent(() => import('../pages/PickerPage'))} />
                  <Route location={location} path="/radio" component={AsyncComponent(() => import('../pages/RadioPage'))} />
                  <Route location={location} path="/slider" component={AsyncComponent(() => import('../pages/SliderPage'))} />
                  <Route location={location} path="/stepper" component={AsyncComponent(() => import('../pages/StepperPage'))} />
                  <Route location={location} path="/switch" component={AsyncComponent(() => import('../pages/SwitchPage'))} />
                  <Route location={location} path="/uploader" component={AsyncComponent(() => import('../pages/UploaderPage'))} />

                  {/* 操作反馈 */}
                  <Route location={location} path="/action-sheet" component={AsyncComponent(() => import('../pages/ActionSheetPage'))} />
                  <Route location={location} path="/button" component={AsyncComponent(() => import('../pages/ButtonPage'))} />
                  <Route location={location} path="/modal" component={AsyncComponent(() => import('../pages/ModalPage'))} />
                  <Route location={location} path="/popup" component={AsyncComponent(() => import('../pages/PopupPage'))} />
                  <Route location={location} path="/pull" component={AsyncComponent(() => import('../pages/PullPage'))} />
                  <Route location={location} path="/swipe-action" component={AsyncComponent(() => import('../pages/SwipeActionPage'))} />
                  <Route location={location} path="/toast" component={AsyncComponent(() => import('../pages/ToastPage'))} />

                  {/* 数据展示 */}
                  <Route location={location} path="/badge" component={AsyncComponent(() => import('../pages/BadgePage'))} />
                  <Route location={location} path="/cell" component={AsyncComponent(() => import('../pages/CellPage'))} />
                  <Route location={location} path="/icon" component={AsyncComponent(() => import('../pages/IconPage'))} />
                  <Route location={location} path="/message" component={AsyncComponent(() => import('../pages/MessagePage'))} />
                  <Route location={location} path="/notice-bar" component={AsyncComponent(() => import('../pages/NoticeBarPage'))} />
                  <Route location={location} path="/panel" component={AsyncComponent(() => import('../pages/PanelPage'))} />
                  <Route location={location} path="/progress" component={AsyncComponent(() => import('../pages/ProgressPage'))} />
                  <Route location={location} path="/spinner" component={AsyncComponent(() => import('../pages/SpinnerPage'))} />
                  <Route location={location} path="/swipe" component={AsyncComponent(() => import('../pages/SwipePage'))} />
                  <Route location={location} path="/tab" component={AsyncComponent(() => import('../pages/TabPage'))} />

                  {/* <Route location={location} component={AsyncComponent(() => import('../pages/NotFoundPage'))} /> */}
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
