import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'normalize.css';
// import FastClick from 'fastclick';
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
      <TransitionGroup>
        <CSSTransition
          key={currentKey}
          timeout={300}
          classNames={(history.action === 'PUSH' || (history.action === 'POP' && !match.isExact)) ? 'out' : 'in'}
          appear>
          <section>
            <Switch key={location.pathname} location={location}>
              <Route exact path="/" component={AsyncComponent(() => import('../pages/Index'))} />

              {/* 表单组件 */}
              <Route path="/checkbox" component={AsyncComponent(() => import('../pages/CheckboxPage'))} />
              <Route path="/input" component={AsyncComponent(() => import('../pages/InputPage'))} />
              <Route path="/picker" component={AsyncComponent(() => import('../pages/PickerPage'))} />
              <Route path="/datePicker" component={AsyncComponent(() => import('../pages/DatePickerPage'))} />
              <Route path="/radio" component={AsyncComponent(() => import('../pages/RadioPage'))} />
              <Route path="/slider" component={AsyncComponent(() => import('../pages/SliderPage'))} />
              <Route path="/stepper" component={AsyncComponent(() => import('../pages/StepperPage'))} />
              <Route path="/switch" component={AsyncComponent(() => import('../pages/SwitchPage'))} />
              <Route path="/file-picker" component={AsyncComponent(() => import('../pages/FilePickerPage'))} />

              {/* 操作反馈 */}
              <Route path="/action-sheet" component={AsyncComponent(() => import('../pages/ActionSheetPage'))} />
              <Route path="/button" component={AsyncComponent(() => import('../pages/ButtonPage'))} />
              <Route path="/modal" component={AsyncComponent(() => import('../pages/ModalPage'))} />
              <Route path="/popup" component={AsyncComponent(() => import('../pages/PopupPage'))} />
              <Route path="/pull" component={AsyncComponent(() => import('../pages/PullPage'))} />
              <Route path="/swipe-action" component={AsyncComponent(() => import('../pages/SwipeActionPage'))} />
              <Route path="/toast" component={AsyncComponent(() => import('../pages/ToastPage'))} />

              {/* 数据展示 */}
              <Route path="/accordion" component={AsyncComponent(() => import('../pages/AccordionPage'))} />
              <Route path="/badge" component={AsyncComponent(() => import('../pages/BadgePage'))} />
              <Route path="/cell" component={AsyncComponent(() => import('../pages/CellPage'))} />
              <Route path="/icon" component={AsyncComponent(() => import('../pages/IconPage'))} />
              <Route path="/message" component={AsyncComponent(() => import('../pages/MessagePage'))} />
              <Route path="/notice-bar" component={AsyncComponent(() => import('../pages/NoticeBarPage'))} />
              <Route path="/panel" component={AsyncComponent(() => import('../pages/PanelPage'))} />
              <Route path="/progress" component={AsyncComponent(() => import('../pages/ProgressPage'))} />
              <Route path="/spinner" component={AsyncComponent(() => import('../pages/SpinnerPage'))} />
              <Route path="/swipe" component={AsyncComponent(() => import('../pages/SwipePage'))} />
              <Route path="/tab" component={AsyncComponent(() => import('../pages/TabPage'))} />

              <Route component={AsyncComponent(() => import('../pages/NotFoundPage'))} />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);
