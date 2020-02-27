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
    margin-top: 35px;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
  }

  h3 {
    cursor: pointer;
    color: #0070e0;

    margin: 30px 0px;

    :hover {
      color: #92ceff;
    }
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
          <h3 onClick={onFolderClick}>New folder <i class="fas fa-folder-plus"></i></h3>
          {newFolder ? <NewFolder onClickToggle={onFolderClick} /> : <div></div>}
        </div>
        <h3 onClick={handleToggle}>Upload file <i class="fas fa-file-upload"></i></h3>
        <h3>Favorites <i class="fas fa-star"></i></h3>
      </div>
      <div className="footer">
        <LogoutButton />
      </div>
      {toggle ? <UploadFile toggleModal={handleToggle} toggle={toggle}/> : null}
    </Container>

  )
}

export default SideBar;
