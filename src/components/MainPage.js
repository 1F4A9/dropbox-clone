import React from 'react';
import FileList from "../components/FileList"
import { fetchDataFromUser } from '../api/API';

function MainPage() {

  // fetchDataFromUser(); // denna funktionen console loggar användarens filer och data.

  return (
    <>
      <h1>MAIN PAAAAGE</h1>
      <h2>TODO: Router system för login/main</h2>
      <FileList></FileList>
    </>
  )
}

export default MainPage; 