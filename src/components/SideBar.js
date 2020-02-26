import React, { useState } from 'react'
import styled from 'styled-components';
import UploadFile from '../components/UploadFile';

import LogoutButton from './LogoutButton';
import NewFolder from "./NewFolder";

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
  color: #202020;

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
  const [newFolder, setNewFolder] = useState(false);
  const [toggle, updateToggle] = useState(false);

  const onFolderClick = (e) => {
      setNewFolder(!newFolder);
  }

  const handleToggle = () =>{
    updateToggle(!toggle)
  }

  return (
    <Container>
      <div className="header">
        <div>
          <h1 onClick={onFolderClick}>New folder</h1>
          {newFolder ? <NewFolder onClickToggle={onFolderClick} /> : <div></div>}
        </div>
        <h1 onClick={handleToggle}>Upload file</h1>
        <h1>Favorites</h1>
      </div>
      <div className="footer">
        <LogoutButton />
      </div>
      {toggle ? <UploadFile toggleModal={handleToggle} toggle={toggle}/> : null}
    </Container>

  )
}

export default SideBar;
