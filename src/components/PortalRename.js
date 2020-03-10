import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { GlobalStyle } from '../utilities/GlobalStyle';
import { renameFiles } from '../api/API';
import { favorites$, toggleFavorite } from "../Observables/Store";

const Container = styled.div`
  position: fixed;
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

  .rename {
    background-color: rgba(41, 116, 255, 1);
    border: 0px;
    color: white;
  }

  p {
    margin-bottom: 0px;
  }

  input[type="text"] {
    margin-bottom: 20px;
  }
`;

const PortalRename = ({ displayRename, file }) => {
  const [input, setInput] = useState('');

  const inputRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    inputRef.current.focus();
    const subsription = favorites$.subscribe();
    return () => subsription.unsubscribe;
  }, [])

  const displayNotification = (boolean) => {
    displayRename(boolean)
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (favorites$.value.find(x => x.id === file.id)) {
      toggleFavorite(file);
    }
    renameFiles(file.path_lower, input, token)
      .then(() => {

        displayNotification(false);
      })
      .catch(data => {
        console.error(data);
        displayNotification(false);
      })

  }

  return ReactDOM.createPortal(
    <Container>
      <GlobalStyle mask={true} />
      <header>
        <p>Rename the selected item</p>
      </header>
      <form onSubmit={onSubmit}>
        <main>
          <input ref={inputRef} placeholder="new name..." type="text" onChange={onChange} value={input} />
        </main>
        <footer>
          <input type="button" className="btn cancel" value="cancel" onClick={() => displayNotification(false)} />
          <input type="button" className="btn rename" value="rename" onClick={onSubmit} />
        </footer>
      </form>
    </Container>,
    document.getElementById('portal-rename')
  )
}

export default PortalRename;