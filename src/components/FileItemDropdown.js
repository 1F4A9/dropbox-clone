import React, { useState } from 'react'
import styled from "styled-components";

import DropdownItems from './DropdownItems';
import CopyFile from "./PortalCopy";
import PortalDelete from './PortalDelete';
import PortalRename from './PortalRename';
import PortalMove from "./PortalMove";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #637282;
  padding: 0px 15px;

  .meny {
    border-radius: 4px;
    border: 2px solid transparent;
  }
`;

export default function FileItemMeny({ file }) {
  const [dropdown, setDropdown] = useState(false);
  const [notification, setNotification] = useState(false);
  const [rename, setRename] = useState(false);
  const [copy, setCopy] = useState(false);
  const [move, setMove] = useState(false);

  const onClick = () => {
    if (!notification) {
      setDropdown(!dropdown);
    }
  }

  const displayDelete = (boolean) => {
    setNotification(boolean)
  }

  const displayRename = (boolean) => {
    setRename(boolean);
  }

  const displayCopy = (boolean) => {
    setCopy(boolean)
  }

  const displayMove = (boolean) => {
    setMove(boolean)
  }

  return (
    <Container onClick={onClick}>
      { notification ? <PortalDelete file={file} displayDelete={displayDelete} /> : null }
      { dropdown ? <DropdownItems file={file} displayDelete={displayDelete} displayRename={displayRename} displayCopy={displayCopy} displayMove={displayMove}/> : null}
      { copy ? <CopyFile file={file} displayCopy={displayCopy} /> : null }
      { rename ? <PortalRename file={file} displayRename={displayRename} /> : null }
      { move ? <PortalMove file={file} displayMove={displayMove} /> : null }
      <i className="material-icons meny">more_horiz</i>
    </Container>
  )
}