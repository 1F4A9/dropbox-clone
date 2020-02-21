import React from 'react'
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  .box {
  }
  h1 {
    color: ${props => props.color}
  }
`;


function SideBar() {
  return (
    <Container color={'blue'}>
      <div className="box">
        <h1>Home</h1>
        <h1>Upload files</h1>
        <h1>New folder</h1>
      </div>
      <div className="box-left"></div>
    </Container>
  )
}

export default SideBar;
