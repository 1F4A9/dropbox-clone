import React from 'react';
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

    </Container>
  )
}

export default MainPage;
