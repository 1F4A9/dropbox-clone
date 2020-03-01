import React, { useEffect, useState, useParams } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import { useDebounce } from 'use-debounce';

import { token$ } from '../Observables/Store';
import SideBar from '../components/SideBar';
import styled from 'styled-components';
import FileList from "../components/FileList"

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
`;

/* let { path } = useParams();
console.log(path); */

function MainPage({ location, ...props }) {
//  console.log("NEW LOCATION", location.pathname);
  const [token, setToken] = useState(token$.value);
  const [searchFile, updateSearchFile] = useState('');
  const [list, updateList] = useState([]);
  const [value] = useDebounce(searchFile, 600);
  let searchItems = [];

  useEffect(() => {
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesSearch({path:  window.location.pathname.substring(5), query: searchFile})
      .then(res => {

        res.matches.map(data => searchItems.push(data.metadata));
        updateList(searchItems)
      })
  }, [value])

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  function handleSearch(e){
    updateSearchFile(e.target.value)
  }

  return (
    <Container>
      {token ? null : <Redirect to="/login" />}
      <SideBar />
      <main>
        <h1>MAIN PAGE CONTENT</h1>
        <input type='search'  onChange={handleSearch} value={searchFile}/>
        <FileList token={token} pathname={location.pathname} list={list}/>
      </main>
    </Container>
  )
}

export default MainPage;
