import { render } from '@/utils/reactRoot';
import { ConfigProvider } from 'antd';
import 'core-js/es';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import 'zarm/react19';
import App from './components/App';

render(
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
