import React, { useState, useRef } from 'react'
import styled from "styled-components";

import DropdownItems from './DropdownItems';

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

  const onClick = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
  }

  return (
    <Container onClick={onClick}>
      {dropdown ? <DropdownItems file={file} /> : null}
      <i className="material-icons meny">more_horiz</i>
    </Container>
  )
}