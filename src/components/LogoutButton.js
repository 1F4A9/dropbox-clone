import React from 'react'
import styled from 'styled-components';

import { updateToken } from '../Observables/Store';

const Container = styled.div`
  cursor: pointer;
  font-size: 22px;

  :hover {
    text-decoration: underline;
  }
`;

const LogoutButton = () => {
  return (
      <Container onClick={() => updateToken(null)}>
        Logout
      </Container>
    )
}

export default LogoutButton;
