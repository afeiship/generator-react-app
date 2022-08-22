import React from 'react';
import { useGlobal } from '@jswork/react-mobxer';

const App = () => {
  const { user, auth } = useGlobal();

  return (
    <div>Hello {user.username}</div>
  );
};

export default App;
