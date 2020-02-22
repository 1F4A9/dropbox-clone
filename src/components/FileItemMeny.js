import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  color: #637282;
  padding: 0px 15px;

  .meny {
    border-radius: 4px;
  }
`;

export default function FileItemMeny() {
  return (
    <Container>
      <i className="material-icons meny">more_horiz</i>
    </Container>
  )
}
