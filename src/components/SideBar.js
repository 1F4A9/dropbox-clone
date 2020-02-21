import React from 'react'
import styled from 'styled-components';

import LogoutButton from './LogoutButton';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
  height: 100vh;
  max-width: 300px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #f7f9fa;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
`;

function SideBar() {
  return (
    <Container>
      <div className="header">
        <h1>Home</h1>
        <h1>Upload files</h1>
        <h1>New folder</h1>
      </div>
      <div className="footer">
        <LogoutButton />
      </div>
    </Container>
  )
}

export default SideBar;
