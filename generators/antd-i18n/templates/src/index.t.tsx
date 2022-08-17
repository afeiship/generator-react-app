import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from '@jswork/react-ant-i18n';
import App from './app.t';


const AppLoading = () => <span>loading..</span>;

ReactDOM.render(
  <Suspense fallback={<AppLoading />}>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </Suspense>,
  document.getElementById('root')
);
