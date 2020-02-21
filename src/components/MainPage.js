import React from 'react';

import { fetchDataFromUser } from '../api/API';
import Aside from '../components/Aside';

function MainPage() {

  // fetchDataFromUser(); // denna funktionen console loggar användarens filer och data.

  return (
    <>
      <h1>MAIN PAAAAGE</h1>
      <h2>TODO: Router system för login/main</h2>
      <Aside />

    </>
  )
}

export default MainPage; 