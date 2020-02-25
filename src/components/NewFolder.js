import React from "react";
import styled from 'styled-components';
import { Star, StarBorder } from '@material-ui/icons';
import { filterOutIconsToRender } from "../utilities/FilterOutIconsToRender";

const Container = styled.aside`
  .shadow{
    position: absolute;
    top: 0;
    left: 0;
    width: ${props=>props.width + "px"};
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
    display:flex;
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
    margin-bottom:5px;
    color: gray;
    font-size: 14px;
  }
  .border{
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
  }
  .icon-container {
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
  .create{
    background-color: rgba(41, 116, 255, 1);
    border: 0px;
    color: white;
  }
`;

function NewFolder(){


  return (
    <Container width={window.innerWidth}>
      <div className="shadow">
        <div className="border">
          <header className="row">
            <i className="material-icons data-format folderIcon">{filterOutIconsToRender("folder", "")}</i>
            <h3>Create folder</h3>
          </header>
          <div className="column left">
            <div>
              <p className="miniTitle">Name</p>
              <input className="input" placeholder="Folder name" />
            </div>
            <div>
              <p className="miniTitle">Location : Dropbox</p>
            </div>
          </div>
          <footer className="myFooter">
            <button className="btn cancel">Cancel</button>
            <button className="btn create">Create</button>
          </footer>
        </div>
      </div>
    </Container>
  )
}

export default NewFolder;