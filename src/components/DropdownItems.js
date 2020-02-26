import React from 'react';
import styled from "styled-components";

import { Download, deleteFilesAndFolders } from "../api/API";

const Container = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 32px;
  right: 15px;
  border: 1px solid #e6e8eb;
  border-radius: 4px;
  background-color: #fff;
  z-index: 1;

  .trigger-action {
    padding: 5px;

    :hover {
      color: #92ceff;
    }
  }
`;

export default function DropdownItems({ file }) {
  const token = localStorage.getItem("token");

  const deleteFiles = () => {
    deleteFilesAndFolders(file.path_lower, token)
      .then(metaData => {
        console.log(metaData);
        console.log('RADERAD MEN UPDATERAR EJ SIDAN I VÄNTAN PÅ WEBSOCKETS!!!')
      })
  }

  return (
    <Container>
      <div className="trigger-action" onClick={() => Download(file, token)}>Download</div>
      <div className="trigger-action">Copy</div>
      <div className="trigger-action" onClick={deleteFiles}>Delete</div>
    </Container>
  )
}