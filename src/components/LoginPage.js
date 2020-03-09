import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { token$ } from '../Observables/Store';
import styled from 'styled-components';

import { fetchAccessesTokenFromUser } from '../api/API';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  header {
    display: flex;
    align-items: center;
    color: black;
  }

  .fa-dropbox {
    padding: 5px;
    font-size: 30px;
    color: #0062ff;
  }

  button {
    width: 200px;
    height: 40px;
    outline: none;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 600;
    background-color: #0062ff;
    cursor: pointer;

    transition: all 0.4s ease 0s;

    :hover {
      background-color: #659FFC;
    }
  }
`;

function LoginPage() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, [])

  return (
    <Container>
      <header>
        <i className="fab fa-dropbox"></i>
        <h1>Dropbox Clone</h1>
        <i className="fab fa-dropbox"></i>
      </header>
      {token ? <Redirect to="/home" /> : null}
      <button onClick={() => fetchAccessesTokenFromUser()}>Login with Dropbox</button>
      <footer>
        <span>
          Developed with &nbsp;
          <i className="fas fa-heart"></i>
          &nbsp; and  &nbsp;
          <i className="fas fa-mug-hot"></i>
          &nbsp;
        </span>
      </footer>
    </Container>
  )
}

export default LoginPage;