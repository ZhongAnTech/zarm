import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router } from 'react-router';

const rootRoute = {
  path: '/',
  component: require('./components/App'),
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./pages/Index'));
      });
    },
  },
  childRoutes: [
    // 表单组件
    {
      path: 'checkbox',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/CheckboxPage'));
        });
      },
    },
    {
      path: 'input',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/InputPage'));
        });
      },
    },
    {
      path: 'picker',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/PickerPage'));
        });
      },
    },
    {
      path: 'radio',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/RadioPage'));
        });
      },
    },
    {
      path: 'stepper',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/StepperPage'));
        });
      },
    },
    {
      path: 'switch',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwitchPage'));
        });
      },
    },
    {
      path: 'uploader',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/UploaderPage'));
        });
      },
    },

    // 操作反馈
    {
      path: 'actionsheet',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ActionSheetPage'));
        });
      },
    },
    {
      path: 'button',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ButtonPage'));
        });
      },
    },
    {
      path: 'modal',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ModalPage'));
        });
      },
    },
    {
      path: 'popup',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/PopupPage'));
        });
      },
    },
    {
      path: 'swipeAction',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwipeActionPage'));
        });
      },
    },
    {
      path: 'toast',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ToastPage'));
        });
      },
    },

    // 数据展示
    {
      path: 'badge',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/BadgePage'));
        });
      },
    },
    {
      path: 'cell',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/CellPage'));
        });
      },
    },
    {
      path: 'icon',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/IconPage'));
        });
      },
    },
    {
      path: 'message',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/MessagePage'));
        });
      },
    },
    {
      path: 'progress',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ProgressPage'));
        });
      },
    },
    {
      path: 'spinner',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SpinnerPage'));
        });
      },
    },
    {
      path: 'swipe',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwipePage'));
        });
      },
    },
    {
      path: 'tab',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/TabPage'));
        });
      },
    },

    // 其他
    // {
    //   path: 'lottery',
    //   getComponent(location, cb) {
    //     require.ensure([], (require) => {
    //       cb(null, require('./pages/LotteryPage'));
    //     });
    //   },
    // },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/NotFoundPage'));
        });
      },
    },
  ],
};

ReactDOM.render(
  <Router routes={rootRoute} history={hashHistory} onUpdate={() => window.scrollTo(0, 0)} />,
  document.getElementById('app')
);
