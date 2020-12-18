import 'core-js/es';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';

const Page = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

ReactDOM.render(<Page />, document.getElementById('app'));
