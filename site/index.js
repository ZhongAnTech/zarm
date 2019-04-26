import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'));
