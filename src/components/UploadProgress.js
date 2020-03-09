import React from 'react';
import styled from 'styled-components';

import LoadingCircle from '../components/LoadingCircle'

const Container = styled.div`
  .progressContainer{
    position: fixed;
    left: 20%;
    bottom: 25px;
    width: 70%;
    height: 50px;
    background: #f7f9fa;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(207,203,207,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(207,203,207,1);
    box-shadow: 0px 0px 5px 3px rgba(207,203,207,1);
    display: flex;
    justify-content: center;
    aligen-items: center;
    border-radius: 5px;
  }

  .fileName{
    margin: 5px;
  }

  .fileSize{
    margin: 5px;
  }

  .closeBtn{
    margin: 5px;
    cursor: pointer;
    color: #0070e0;
  }

  .closeBtn:hover{
    color: #92ceff;
  }

  .fa-check{
    margin: 8px;
    color: #0070e0;
  }
`;

function UploadProgress(props) {

  let { name, size } = props.info;
  size = Math.round(size * 0.000001 );

  function handleClose(){
    props.setDisplayDone(!props.displayDone);
  }

  return(
    <Container>
      {!props.uploadDone ? <div className='progressContainer'>
        <LoadingCircle scale={0.3} />
        <span className='fileName'>Uploading  {name}</span>
        <span className='fileSize'>{props.uploadedSize}/{size} MB</span>
      </div>: null}
      {props.displayDone ? <div className='progressContainer'>
        <i className="fa fa-check" aria-hidden="true"></i>
        <span className='fileName'>Uploading  {name} complete!</span>
        <span className='closeBtn' onClick={handleClose}>Close</span>
      </div>: null}

    </Container>
  )
}

export default UploadProgress;
