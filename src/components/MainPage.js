import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { updateToken, token$ } from '../Observables/Store';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import FileList from "../components/FileList"


const Container = styled.div`
  display: flex;
  justify-content: center;

  main {
    display: flex;
    flex: 4;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

function MainPage() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Container>
      {token ? null : <Redirect to="/login" />}
      <SideBar />
      <main>
        <h1>MAIN PAGE CONTENT</h1>
      <FileList token={token} />
      </main>

    </Container>
  )
}

export default MainPage;
