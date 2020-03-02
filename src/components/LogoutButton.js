import React from 'react'
import styled from 'styled-components';

import { updateToken, removeStarItems } from '../Observables/Store';

const Container = styled.div`
  cursor: pointer;
  font-size: 22px;

  :hover {
    text-decoration: underline;
  }
`;

function onClick() {
  updateToken(null)
  removeStarItems();
}

const LogoutButton = () => {
  return (
    <Container onClick={onClick}>
      Logout
      </Container>
  )
}

export default LogoutButton;
