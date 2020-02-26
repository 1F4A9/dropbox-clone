import React from "react";
import styled, { keyframes } from "styled-components";

const rotateRight = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`

const rotateLeft = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(-360deg);
  }
`


const Container = styled.aside`
  #spinnerBig{
    width: 50px;
    height: 25px; 
    border-top-left-radius: 60px; 
    border-top-right-radius: 60px;
    border: 4px solid #92ceff;
    border-bottom: 0;
  }
  #spinnerSmall{
    width: 40px;
    height: 20px; 
    border-top-left-radius: 30px; 
    border-top-right-radius: 30px;
    border: 4px solid #92ceff;
    border-bottom: 0;
  }
  .spinRight{
    position: absolute;
    display:flex;
    justify-content: flex-start;
    width:50px;
    height:50px;
    animation: ${rotateRight} .6s linear infinite;
  }
  .spinLeft{
    display:flex;
    justify-content: flex-start;
    width:35px;
    height:35px;
    animation: ${rotateLeft} .5s linear infinite;
  }
  .putTogether{
    position: relative;
    left: -10px;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`
// !!! Send prop "scale" to change scale of component !!!
function LoadingCircle(props){
  return(
    <Container>
      <div className="putTogether" style={{transform: "scale("+props.scale+","+props.scale+")"}}>
        <div className="spinRight">
          <div id="spinnerBig"></div>
        </div>
        <div className="spinLeft">
          <div id="spinnerSmall"></div>
        </div>
      </div>
    </Container>
  )
  
}

export default LoadingCircle;