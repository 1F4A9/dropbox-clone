import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { updateToken, token$ } from '../Observables/Store';

function UploadFile(){
  const [Url, updateUrl] = useState([]);

  const handleUpload= () =>{
    const dropbox = new Dropbox({ accessToken: token$, fetch });
    dropbox.usersGetCurrentAccount()
    .then(function (response) {
        updateUser(response.name.given_name);
      })

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
