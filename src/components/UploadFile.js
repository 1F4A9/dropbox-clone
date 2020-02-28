import React, {useState, useEffect} from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';
import styled from 'styled-components';

import UploadProgress from '../components/UploadProgress';
import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";
import { filesListFolder, fetchDataFromUser } from "../api/API";


import FileItem from "../components/FileItem";

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
  .overFlow{
    position: relative;
    overflow-y:scroll;
    overflow-x:hidden;
    height: 280px;
    display:flex;
    flex-direction: column;
  }
  .flex-container {
    margin-left: 0px;
    margin-right: 0px;
  }
  .metadata-container{
    display:none;
  }
  .right-content{
    display:none;
  }
  .MuiSvgIcon-root{
    display:none;
  }
`;

function UploadFile(props){
  const [file, updateFile] = useState(null);
  const [largeFileUpload, updateLargeFileUpload] = useState(false);
  const [idx, setIdx] = useState(0);
  const [info, setInfo] = useState({name: '', size: ''});
  const [items, setItems] = useState(0);
  const [uploadedSize, setUploadedSize] = useState(0);
  const [uploadDone, setUploadDone] = useState(false)
  const [state, updateState] = useState({
    files: [],
  })
  let path = window.location.pathname.substring(5);
  const [usepath, updatePath] = useState(path);

  useEffect(() => {
      fetchDataFromUser(token$.value)
          .then((response) => {
              updateState({
                  files: response,
              })
          }).catch((err) => {
              console.error(err);
          })
  }, [])

  useEffect(() => {
  }, [path]);

  function handlePath(usepath) {
      filesListFolder(token$.value, usepath)
          .then((response) => {
              updateState({
                  files: response.entries
              })
              updatePath(usepath)
          })
          .catch((err) => {
              console.error(err);
          })
  }

  const upload_Size_Limit = 150*1024*1024;

  const handleItem= (e) =>{
    updateFile(e.target.files[0]);

  }

  const handleUpload= (e) =>{
    const dropbox = new Dropbox({ accessToken: token$.value, fetch });
    if(file === null) return;
    if(file.size < upload_Size_Limit){  // file is smaller then 150Mb- use filesUpload API
      dropbox.filesUpload({
        contents: file,
        path: usepath + '/' + file.name,
        autorename: true,
      })
      .then((response) => {
          props.toggleModal()
          console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      const maxBlob = 8 * 1000 * 1000;
      let workItems = [];
      let offset = 0;
      updateLargeFileUpload(true);
      setInfo({ name: file.name, size: file.size });
      while (offset < file.size) {
        let chunkSize = Math.min(maxBlob, file.size - offset);
        workItems.push(file.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      const task = workItems.reduce((acc, blob, idx, items) => {
        if (idx === 0) {
          return acc.then(() => {
            return dropbox
              .filesUploadSessionStart({ close: false, contents: blob })
              .then((response) => {
                setIdx(idx);
                setItems(items.length);

                return response.session_id;
              });
          });
        } else if (idx < items.length - 1) {
          return acc.then((sessionId) => {
            var cursor = { session_id: sessionId, offset: idx * maxBlob };
            return dropbox.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob })
              .then(() => {
                setIdx(idx);
                setUploadedSize((idx * maxBlob * 0.000001).toFixed(0));
                return sessionId;
              });
          });
        } else {
          return acc.then(function(sessionId) {
            var cursor = {
              session_id: sessionId,
              offset: file.size - blob.size
            };
            var commit = {
              path: "/" + file.name,
              mode: "add",
              autorename: true,
              mute: false
            };
            return dropbox
              .filesUploadSessionFinish({
                cursor: cursor,
                commit: commit,
                contents: blob
              })
              .then((res) => {
                setUploadDone(true);
              });
          });
        }
      }, Promise.resolve());

      task.catch((error) => {
        console.error(error);
      });
    }
    return false;
  };


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
              <div className="overFlow">
                {state.files.filter((file) => file[".tag"] === "folder").map((x) => {
                      return <FileItem
                          files={state.files}
                          tag={x['.tag']}
                          getPath={handlePath}
                          path={x.path_lower}
                          file={x}
                          id={x.id}
                          key={x.id}
                          name={x.name}
                          token={token$.value}
                      >{x.name}

                      </FileItem>;
                  })}
              </div>
            </div>
          </div>
          <footer className="myFooter">
            <button className="btn cancel" onClick={props.toggleModal}>Cancel</button>
            <button className="btn upload" onClick={handleUpload}>Upload</button>
          </footer>
        </div>
      </div>
      <UploadProgress />
    </Container>
  )
}

export default UploadFile;
