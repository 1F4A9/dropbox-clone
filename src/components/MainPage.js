import React, { useEffect, useState, useParams } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import { useDebounce } from 'use-debounce';
import { Search } from '@material-ui/icons';

import { token$ } from '../Observables/Store';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import FileList from "../components/FileList";
import Favorites from "../components/Favorites";

const Container = styled.div`
  display: flex;
  justify-content: center;

  main {
    display: flex;
    flex: 4;
    justify-content: flex-start;
    flex-direction: column;
  }

  h1 {
    margin: 0px 62px;
  }

  .searchContainer{
    display: flex;
    margin-left: 62px;
    border: 1px solid #c1c7cd;
    color: #25282b;
    border-radius: 25px;
    width: 200px;
    transition: width 0.4s ease-in-out;
  }

  .searchContainer:focus-within{
    width: 85%;
  }

  .searchIcon{
    padding: 10px;
  }

  .searchInput{
    font-size: 18px;
    width: 89%;
    padding 10px, 10px, 10px, 0;
    border: none;
    outline: none;
    border-radius: 25px;
    background: trasparent;
  }

`;

function MainPage({ location, ...props }) {
  const [token, setToken] = useState(token$.value);
  const [searchFile, updateSearchFile] = useState('');
  const [list, updateList] = useState([]);
  const [value] = useDebounce(searchFile, 600);
  let searchItems = [];

  let path = window.location.pathname.substring(5).replace(/%20/g, " ");

  useEffect(() => {
    const dbx = new Dropbox({ accessToken: token$.value, fetch });
    dbx.filesSearch({ path: path, query: searchFile })
      .then(res => {
        res.matches.map(data => searchItems.push(data.metadata));
        updateList(searchItems)
      })
  }, [value])

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  function handleSearch(e) {
    updateSearchFile(e.target.value)
  }

  return (
    <Container>
      {token ? null : <Redirect to="/login" />}
      <SideBar />
      <main>
        <h1>xX:DRAGON-SLAYERS-53:Xx</h1>
        <div className='searchContainer'>
          <Search className='searchIcon'></Search>
          <input className='searchInput' type='search' onChange={handleSearch} value={searchFile} placeholder='Search...' />
        </div>
        <FileList token={token} pathname={location.pathname} list={list} />
        <Favorites token={token} pathname={location.pathname} />
      </main>
    </Container>
  )
}

export default MainPage;
