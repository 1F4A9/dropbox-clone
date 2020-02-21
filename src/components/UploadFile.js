import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { updateToken, token$ } from '../Observables/Store';

function UploadFile(){
  const [Url, updateUrl] = useState([]);

  const handleUpload= () =>{
    const dropbox = new Dropbox({ accessToken: token$, fetch });
    dropbox.usersGetCurrentAccount()
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
