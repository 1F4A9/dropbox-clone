import React from 'react';

import { fetchAccessesTokenFromUser } from '../api/API';

function LoginPage() {

  const OAuth = () => {
    fetchAccessesTokenFromUser();
  }

  return (
    <>
      <button onClick={OAuth}>OAuth user</button>
    </>
  )
}

export default LoginPage; 