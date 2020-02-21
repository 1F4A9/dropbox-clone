import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'querystring';
import { updateToken, token$ } from '../Observables/Store';

function Auth() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const parsedHash = queryString.parse(window.location.hash);

    updateToken(parsedHash['#access_token'])

    setToken(token$.value)
    // console.log(token)
  }, [])

  return (
    <>
      {token ? <Redirect to="/" /> : null}
      <h2>AUTH PAGE</h2>
    </>
  )
}

export default Auth;
