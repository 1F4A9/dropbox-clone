import React, { useRef } from 'react';
import styled from "styled-components";

import { Download } from "../api/API";

const Container = styled.div`
  position: absolute;
  width: 100px;
  height: 170px;
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

export default function DropdownItems({ file, displayDelete, displayRename, displayCopy, displayMove}) {
  const clickedEl = useRef(null);
  const token = localStorage.getItem("token");

  const deleteFiles = () => {
    displayDelete(true);
  }

  const renameFiles = () => {
    displayRename(true);
  }

  const copyFiles = () => {
    displayCopy(true);
  }

  const moveFiles = () => {
    displayMove(true);
  }

  return (
    <Container ref={clickedEl} >
      <div className="trigger-action" onClick={() => Download(file, token)}>Download</div>
      <div className="trigger-action" onClick={deleteFiles}>Delete</div>
      <div className="trigger-action" onClick={copyFiles}>Copy</div>
      <div className="trigger-action" onClick={renameFiles}>Rename</div>
      <div className="trigger-action" onClick={moveFiles}>Move</div>
    </Container>
  )
}