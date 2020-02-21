import React from 'react'
import styled from 'styled-components';

const Container = styled.aside` 
  display: flex;
  justify-content: center;

  .box {

  }

  h1 {
    color: ${props => props.color}
  }
`;


function Aside() {
  return (
    <Container color={'blue'}>
      <div className="box">
        <h1>HEJ</h1>
      </div>
      <div className="box-left"></div>
    </Container>
  )
}

export default Aside;