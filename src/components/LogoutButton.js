import React from 'react'
import styled from 'styled-components';

import { updateToken } from '../Observables/Store';

const Button = styled.button`

`;

const LogoutButton = () => {
  return <Button onClick={() => updateToken(null)}/>
}

export default LogoutButton;
