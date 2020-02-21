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

  const OnUpload = (e) =>{
    e.preventDefault();
    handleUpload();
  }


  return(
    <div onClick={OnUpload}>UploadFile</div>
  )
}

export default UploadFile;
