import React from "react";
import styled from 'styled-components';

const Container = styled.aside`
  .shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: ${props=>props.width + "px"};
    height: 100%;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .border{
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
  }
`;

function NewFolder(){


  return (
    <Container width={window.innerWidth}>
      <div className="shadow">
        <div className="border">

        </div>
      </div>
    </Container>
  )
}

export default NewFolder;