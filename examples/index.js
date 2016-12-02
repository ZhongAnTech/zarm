
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
        }, 'Index');
      }
    },
    {
      path: 'icon',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/IconPage'));
        }, 'IconPage');
      }
    },
    {
      path: 'button',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ButtonPage'));
        }, 'ButtonPage');
      }
    },
    {
      path: 'cell',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/CellPage'));
        }, 'CellPage');
      }
    },
    {
      path: 'radio',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/RadioPage'));
        }, 'RadioPage');
      }
    },
    {
      path: 'modal',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ModalPage'));
        }, 'ModalPage');
      }
    },
    {
      path: 'toast',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/ToastPage'));
        }, 'ToastPage');
      }
    },
    {
      path: 'tab',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/TabPage'));
        }, 'TabPage');
      }
    },
    {
      path: 'lottery',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/LotteryPage'));
        }, 'LotteryPage');
      }
    },
    {
      path: 'swipe',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/SwipePage'));
        }, 'SwipePage');
      }
    },
    {
      path: 'page1',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/Page1'));
        }, 'Page1');
      }
    },
    {
      path: 'page2',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/Page2'));
        }, 'Page2');
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/NotFoundPage'));
        }, 'NotFoundPage');
      }
    }
  ],
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./pages/Index'));
      }, 'Index');
    }
  }
}

ReactDOM.render(
  <Router routes={rootRoute} history={hashHistory} />,
  document.getElementById('app')
);
