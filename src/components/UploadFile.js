import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';

function UploadFile(props){
  const [token, updateTokenState] = useState(token$.value);
  const [file, updatefile] = useState([]);

  const handleUpload= (files) =>{
    const dropbox = new Dropbox({ accessToken: token$, fetch });

    console.log(dropbox.filesUpload)
  }

  return (
    <p>Upload File</p>
  )
}

export default UploadFile;