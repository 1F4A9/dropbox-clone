import React, { useState } from 'react';
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

export default function DropdownItems({ file, cb }) {
  const token = localStorage.getItem("token");
  const [toggleCopy, setToggleCopy] = useState(false);

  const deleteFiles = () => {
    cb(true);
  }

  const onCopyToggle = (e) => {
    setToggleCopy(!toggleCopy);
  }

  return (
    <Container>
      <div className="trigger-action" onClick={() => Download(file, token)}>Download</div>
      <div className="trigger-action" onClick={deleteFiles}>Delete</div>
      <div className="trigger-action" onClick={onCopyToggle}>Copy</div>
      <div className="trigger-action">Rename</div>
      <div className="trigger-action">Move</div>
    </Container>
  )
}