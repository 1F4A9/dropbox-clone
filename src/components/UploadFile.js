import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 100;
  position: absolute;
  left: 50%;
  width: 60%;
  height 300px;
}

.uploadContainer{
  position: relative;
  background: white;
  left: -50%;
  border: 1px solid black;
}

`;

function UploadFile(props){
  const [token, updateTokenState] = useState(token$.value);
  const [file, updateFile] = useState(null);

  const path = window.location.pathname;
  console.log(path)

  const handleItem= (e) =>{
    updateFile(e.target.files[0]);

  }

  const handleUpload= (e) =>{

    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    dropbox.filesUpload({
      contents: file,
      path: path + file.name,
      autorename: true,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

  }

  return (
    <Container>
      <div className='uploadContainer'>
        <button onClick={props.toggle}>&times;</button>
        <input
          type='file'
          multiple
          onChange={handleItem}
          />
        <button onClick={handleUpload}>sub</button>
      </div>
    </Container>
  )
}

export default UploadFile;
