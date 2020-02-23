import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';

function UploadFile(props){
  const [token, updateTokenState] = useState(token$.value);
  const [file, updateFile] = useState(null);

  const path = window.location.pathname;
  console.log(path)

  const handleUpload= (e) =>{
    updateFile(e.target.files[0]);
    console.log(file)

    const dropbox = new Dropbox({ accessToken: token$, fetch });
    dropbox.filesUpload({
      contents: file,
      path: path,
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
    <>
      <label htmlFor='uploadFile' >Upload File</label>
      <input
        id='uploadFile'
        type='file'
        multiple
        onChange={handleUpload}
        style={{visibility:'hidden'}}
      />
    </>
  )
}

export default UploadFile;
