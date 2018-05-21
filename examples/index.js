// polyfill
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/modules/es6.promise';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'));
