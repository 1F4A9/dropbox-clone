import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';
import styled from 'styled-components';

import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";
import { filesListFolder } from "../api/API";

const Container = styled.aside`
  .shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: ${props=>props.width + 'px'};
    height: 100%;
    background-color: rgba(14, 37, 52, 0.15);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .row{
    display:flex;
  }
  .column{
    display: flex;
    flex-direction: column;
  }
  .left{
    margin-left: 20px;
  }
  .input{
    width: 90%;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
  }
  .miniTitle{
    margin-bottom: 5px;
    color: grey;
    font-size: 14px;
  }
  .border{
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
  }
  .icon-container{
    display: flex;
    align-items: center;
  }
  .data-format {
    font-size: 35px;
    padding-left: 12px;
    color: #92ceff;
    margin-top: 15px;
    margin-left: 8px;
    margin-right: 10px;
  }
  .myFooter{
    display:flex;
    jusitfy-content: flex-start;
    align-items: center;
    width:100%;
    height: 60px;
    position: relative;
    top: 280px;
    border-radius: 0px 0px 10px 10px;
    border-top: 1px solid rgba(222, 222, 222, 1);
    background-color: rgba(245, 245, 245, 1);
    z-index: 2;
  }
  .btn{
    width: 100px;
    height: 40px;
    margin-left: 10px;
    border: 0.5px solid gray;
    border-radius: 10px;
  }
  .cancel{
    margin-left: 180px;
    background-color: white;
  }
  .upload{
    background-color: rgba(41, 116, 255, 1);
    border: 0px;
    color: white;
  }
`;

function UploadFile(props){
  const [file, updateFile] = useState(null);
  const [progressbar, updateProgressbar] = useState(0);

  const path = window.location.pathname.substring(5);
  console.log(path)

  const handleItem= (e) =>{
    updateFile(e.target.files[0]);
  }

  const upload_Size_Limit = 150*1024*1024;

  const handleUpload= (e) =>{
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    if(file === null) return;
    if(file.size < upload_Size_Limit){  // file is smaller then 150Mb- use filesUpload API
      dropbox.filesUpload({
        contents: file,
        path: path + file.name,
        autorename: true,
        onUploadProgress: e => {
        updateProgressbar(e.loaded / e.total);
        },
      })
      .then((response) => {
          props.toggleModal()
      //  const dropbox = new new Dropbox({ accessToken: token$.value, fetch });
      //  dropbox.filesListFolder({path: path})
      //  filesListFolder(token$.value, window.location.pathname.substring(5))
          console.log(response);
          console.log(progressbar);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {  // File is bigger than 150 Mb - use filesUploadSession API
      const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size

      const workItems = [];
      const offset = 0;

      while (offset < file.size) {
        const chunkSize = Math.min(maxBlob, file.size - offset);
        workItems.push(file.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      const task = workItems.reduce((acc, blob, idx, items) => { //make this to a function
   if (idx == 0) {
     // Starting multipart upload of file
     return acc.then(function() {
       return dropbox.filesUploadSessionStart({ close: false, contents: blob})
                 .then(response => response.session_id)
     });
   } else if (idx < items.length-1) {
     // Append part to the upload session
     return acc.then(function(sessionId) {
      var cursor = { session_id: sessionId, offset: idx * maxBlob };
      return dropbox.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => sessionId);
      //updateProgressbar here
     });
   } else {
     // Last chunk of data, close session
     return acc.then(function(sessionId) {
       var cursor = { session_id: sessionId, offset: file.size - blob.size };
       var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };
       return dropbox.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });
     });
   }
 }, Promise.resolve());

    }
  }


  return (
    <Container width={window.innerWidth}>
      <div className="shadow">
        <div className="border">
          <header className="row">
            <i className="material-icons data-format folderIcon">{filterOutIconsToRender("", "")}</i>
            <h3>Upload file</h3>
          </header>
          <div className="column left">
            <div>
              <p className="miniTitle">Name</p>
              <input
                type='file'
                onChange={handleItem}
                multiple
                />
            </div>
            <div>
              <p className="miniTitle">Location : Dropbox</p>
            </div>
          </div>
          <footer className="myFooter">
            <button className="btn cancel" onClick={props.toggleModal}>Cancel</button>
            <button className="btn upload" onClick={handleUpload}>Upload</button>
          </footer>
        </div>
      </div>
    </Container>
  )
}

export default UploadFile;
