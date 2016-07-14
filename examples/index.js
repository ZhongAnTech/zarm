
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';

const rootRoute = {
  path: '/',
  component: require('./pages/App'),
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
      path: 'cell',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./pages/CellPage'));
        }, 'CellPage');
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
  <Router routes={rootRoute} history={browserHistory} />,
  document.getElementById('app')
);
