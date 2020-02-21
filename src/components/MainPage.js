import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { updateToken, token$ } from '../observables/Store';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import FileList from "../components/FileList"

const Container = styled.div`
  display: flex;
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
      <h1>MAIN PAAAAGE</h1>
      <FileList></FileList>

    </Container>
  )
}

export default MainPage;
