import React from 'react';
import { useIntl } from '@jswork/react-ant-i18n';

const App = () => {
  const { t } = useIntl();

  console.log(t('common.btn'));

  return (
    <div>Hello {t('key')}</div>
  );
};

export default App;
