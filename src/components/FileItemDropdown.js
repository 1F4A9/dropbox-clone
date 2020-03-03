import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";

import DropdownItems from './DropdownItems';
import CopyFile from "./PortalCopy";
import PortalDelete from './PortalDelete';
import PortalRename from './PortalRename';

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

export default function FileItemDropdown({ file }) {
  const [dropdown, setDropdown] = useState(false);
  const [deleteFiles, setDeleteFiles] = useState(false);
  const [rename, setRename] = useState(false);
  const [copy, setCopy] = useState(false);
  const [move, setMove] = useState(false);

  const clickedEl = useRef(null);

  const onClick = () => {
    setDropdown(!dropdown)

    if (deleteFiles || copy || move || rename) {
      setDropdown(false);
    }
  }

  useEffect(() => {
      document.addEventListener('click', (e) => clickedInside(e))
    return () => {
      document.removeEventListener('click', (e) => clickedInside(e))
    };
  }, [])

  const clickedInside = (e) => {
    if (clickedEl.current) {
      if (!clickedEl.current.contains(e.target)) {
        setDropdown(false)
      } 
    }
  }

  const displayDelete = (boolean) => {
    setDeleteFiles(boolean)
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
    <Container ref={clickedEl} onClick={(e) => onClick(e)}>
      { deleteFiles ? <PortalDelete file={file} displayDelete={displayDelete} /> : null }
      { dropdown ? <DropdownItems file={file} displayDelete={displayDelete} displayRename={displayRename} displayCopy={displayCopy} displayMove={displayMove}/> : null}
      { copy ? <CopyFile file={file} copy={true} displayCopy={displayCopy} /> : null }
      { rename ? <PortalRename file={file} displayRename={displayRename} /> : null }
      { move ? <CopyFile file={file} copy={false} displayCopy={displayMove} /> : null }
      <i className="material-icons meny">more_horiz</i>
    </Container>
  )
}