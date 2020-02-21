import React, { useEffect, useState } from 'react';
import { updateToken, token$ } from '../observables/Store';
import { Link, Redirect } from 'react-router-dom';

import Aside from '../components/Aside';

function MainPage() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {token ? null : <Redirect to="/login" />}
      <h1>MAIN PAAAAGE</h1>
      <h2>TODO: Router system för login/main</h2>
      <Aside />
    </>
  )
}

export default MainPage; 