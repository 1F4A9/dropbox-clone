import React from 'react';

import { fetchDataFromUser, fetchAccessesTokenFromUser} from '../api/API';

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