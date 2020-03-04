import React from 'react';
import styled from 'styled-components';
import { CloudDone } from '@material-ui/icons';

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
  }

  .fileName{
    margin: 5px;
  }

  .fileSize{
    margin: 5px;
  }
`;

function UploadProgress(props) {

  let { name, size } = props.info;
  size = Math.round(size*0.000001);
  console.log("test", props.uploadedSize)

  function handleClose(){
    props.setUploadDone(!props.uploadDone);
  }

  return(
    <Container>
      {!props.uploadDone ? <div className='progressContainer'>
        <span className='fileName'>Uploading  {name}</span>
        <span className='fileSize'>{props.uploadedSize}/{size}MB</span>
      </div>:
        <div className='progressContainer'>
          <CloudDone></CloudDone>
          <span className='fileName'>Uploading  {name} complete!</span>
          <p onClick={handleClose}>Close</p>
        </div>
    }

    </Container>
  )
}

export default UploadProgress;
