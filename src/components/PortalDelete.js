import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { deleteFilesAndFolders } from "../api/API";
import { GlobalStyle } from '../utilities/GlobalStyle';
import { favorites$, toggleFavorite } from "../Observables/Store";

const Container = styled.div`
  position: absolute;
  width: 370px;
  height: 150px;
  left: 50%;
  margin-left: -185px;
  top: 50%;
  margin-top: -75px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  footer {
    display: flex;
    justify-content: space-around;
  }

  .btn {
    width: 100px;
    height: 40px;
    margin-bottom: 10px;
    border: 0.5px solid gray;
    border-radius: 10px;
  }

  .cancel {
    background-color: white;
  }

  .delete {
    background-color: rgba(41, 116, 255, 1);
    border: 0px;
    color: white;
  }
`;

const PortalDelete = ({ displayDelete, file }) => {
  const displayNotification = (boolean) => {
    displayDelete(boolean)
  }

  useEffect(() => {
    const subscription = favorites$.subscribe()
    return () => subscription.unsubscribe();
  }, [])

  const deleteItem = () => {
    const token = localStorage.getItem("token");
    toggleFavorite(file);
    deleteFilesAndFolders(file.path_lower, token)
      .then(() => displayDelete(false))  // closes notification window
  }

  return ReactDOM.createPortal(
    <Container>
      <GlobalStyle mask={true} />
      <header>
        <p>Do you really want to remove the selected items?</p>
      </header>
      <footer>
        <button className="btn delete" onClick={deleteItem}>Delete</button>
        <button className="btn cancel" onClick={() => displayNotification(false)}>Cancel</button>
      </footer>
    </Container>,
    document.getElementById('portal-delete')
  )
}

export default PortalDelete;