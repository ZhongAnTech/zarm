import 'core-js/es';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import cssVars from 'css-vars-ponyfill';
import App from './components/App';

cssVars();

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'));
