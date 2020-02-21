import React, {useState} from 'react';
import { Dropbox } from 'dropbox';


function UploadFile(){
  const [Url, updateUrl] = useState([]);

  const fileUpLoad = (e) =>{
    e.preventDefault();
  }


  return(
    <button onClick={fileUpLoad}>UploadFile</button>
  )
}

export default UploadFile;
