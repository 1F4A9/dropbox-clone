import React from 'react'
import styled from 'styled-components';
import UploadFile from '../components/UploadFile';

const Container = styled.aside`
  display: flex;
  flex: 1;

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
        <UploadFile />
        <h1>New folder</h1>
      </div>
      <div className="box-left"></div>
    </Container>
  )
}

export default SideBar;
