import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from '@jswork/react-mobxer';
import App from './app.t';

const ctx = require.context('./stores/', true, /\.(ts|js|tsx|jsx)$/);


ReactDOM.render(
    <ConfigProvider context={ctx} harmony>
      <App />
    </ConfigProvider>,
  document.getElementById('root')
);
