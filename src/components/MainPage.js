import React from 'react';
<<<<<<< HEAD
import FileList from "../components/FileList"
=======
>>>>>>> a7122fe622a12d07c48d4384569134404f97d100
import { fetchDataFromUser } from '../api/API';
import SideBar from '../components/SideBar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

function MainPage() {

  // fetchDataFromUser(); // denna funktionen console loggar användarens filer och data.

  return (
    <Container>
      <SideBar />
      <h1>MAIN PAAAAGE</h1>
      <h2>TODO: Router system för login/main</h2>
      <FileList></FileList>

    </Container>
  )
}

export default MainPage;
