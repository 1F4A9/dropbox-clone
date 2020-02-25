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

  function onFolderClick(){
    if(newFolder){
      setNewFolder(false)
    }else{
      setNewFolder(true)
    }
  }

  console.log(newFolder)

  return (
    <Container>
      <div className="header">
        <h1>Home</h1>
        <UploadFile />
        <div>
          <h1 onClick={onFolderClick}>New folder</h1>
          {newFolder ? <NewFolder /> : <div></div>}
        </div>
      </div>
      <div className="footer">
        <LogoutButton />
      </div>
    </Container>
  )
}

export default SideBar;
