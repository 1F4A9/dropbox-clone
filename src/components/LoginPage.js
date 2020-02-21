import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { updateToken, token$ } from '../Observables/Store';

import { fetchAccessesTokenFromUser } from '../api/API';

function LoginPage() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, [])

  return (
    <>
      {token ? <Redirect to="/" /> : null}
      <button onClick={() => fetchAccessesTokenFromUser()}>OAuth user</button>
    </>
  )
}

export default LoginPage;
