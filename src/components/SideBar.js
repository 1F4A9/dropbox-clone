import React, { useState } from 'react'
import styled from 'styled-components';
import UploadFile from '../components/UploadFile';

import LogoutButton from './LogoutButton';
import NewFolder from "./NewFolder";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 100vh;
  max-width: 200px;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #f7f9fa;
  color: #202020;

  .header {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-left: 15px;
  }

  .footer {
    height:0px;
    display: flex;
    justify-content: left;
    margin-left: 20px;
  }

  h3 {
    cursor: pointer;
    color: #0070e0;
    :hover {
      color: #92ceff;
    }
  }
  
  .item:hover {
    text-decoration: underline;
  }
  .item {
    margin: 5px;
  }
  .logo {
    font-size: 45px;
    color: #0070e0;
    margin-left: 15px;
    margin-top: 20px;
  }
  .line{
    margin-left: 5%;
    width: 90%;
    border-top: 1.5px solid #e6e8eb;
  }
  .lineBot{
    position: absolute;
    bottom: 65px;
    margin-left: 5%;
    width: 90%;
    border-top: 1.5px solid #e6e8eb;
  }
`;

function SideBar() {
  const [newFolder, setNewFolder] = useState(false);
  const [toggle, updateToggle] = useState(false);

  const onFolderClick = (e) => {
    setNewFolder(!newFolder);
  }

  const handleToggle = () => {
    updateToggle(!toggle)
  }

  return (
    <Container>
      <div className="superHeader">
        <i className="logo fab fa-dropbox"></i>
      </div>
      <div className="header">
        <div>
          <h3 className="item" onClick={onFolderClick}>New folder <i className="fas fa-folder-plus"></i></h3>
          {newFolder ? <NewFolder onClickToggle={onFolderClick} /> : <div></div>}
        </div>
        <h3 className="item" onClick={handleToggle}>Upload file <i className="fas fa-file-upload"></i></h3>
      </div>
      <div className="line"></div>
      <div className="lineBot"></div>
      <div className="footer">
        <LogoutButton />
      </div>
      {toggle ? <UploadFile toggleModal={handleToggle} toggle={toggle} /> : null}
    </Container >

  )
}

export default SideBar;
