import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router } from 'react-router';

const rootRoute = {
  path: '/',
  component: require('./components/App'),
  childRoutes: [
    {
      path: 'index',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/Index'));
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
      path: 'badge',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/BadgePage'));
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
      path: 'cell',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/CellPage'));
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
      path: 'modal',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ModalPage'));
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
    {
      path: 'tab',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/TabPage'));
        });
      },
    },
    {
      path: 'lottery',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/LotteryPage'));
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
      path: 'swipe',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwipePage'));
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
      path: 'swipeAction',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwipeActionPage'));
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
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/NotFoundPage'));
        });
      },
    },
  ],
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./pages/Index'));
      });
    },
  },
};

ReactDOM.render(
  <Router routes={rootRoute} history={hashHistory} onUpdate={() => window.scrollTo(0, 0)} />,
  document.getElementById('app')
);
