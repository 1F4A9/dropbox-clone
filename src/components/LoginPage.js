import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { token$ } from '../Observables/Store';

import { fetchAccessesTokenFromUser } from '../api/API';

function LoginPage() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, [])

  return (
    <>
      {token ? <Redirect to="/home/" /> : null}
      <button onClick={() => fetchAccessesTokenFromUser()}>OAuth user</button>
    </>
  )
}

export default LoginPage;
