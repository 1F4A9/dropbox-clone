import React from 'react'
import styled from 'styled-components';

import { updateToken, removeStarItems } from '../Observables/Store';

const Container = styled.div`
  cursor: pointer;
  color: #0070e0;
  position: absolute;
  bottom: 0;

  :hover {
    color: #92ceff;
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
      <h3>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></h3>
      </Container>
  )
}

export default LogoutButton;
