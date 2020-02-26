import React, { useEffect, useState, useParams } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { token$ } from '../Observables/Store';
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
    flex-direction: column;
  }

  h1 {
    margin: 0px 62px;
  }
`;

/* let { path } = useParams();
console.log(path); */

function MainPage({ location, ...props }) {
  console.log("NEW LOCATION", location.pathname);
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
        <FileList token={token} pathname={location.pathname} />
      </main>

    </Container>
  )
}

export default MainPage;
