import 'core-js/es';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './components/App';

ReactDOM.render(
  <HashRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00bc70',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </HashRouter>,
  document.getElementById('app'),
);
