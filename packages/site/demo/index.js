import { render } from '@/utils/reactRoot';
import 'core-js/es';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import 'zarm/react19';
import App from './components/App';

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app'),
);
