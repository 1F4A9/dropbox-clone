import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../Observables/Store';

import FileItem from "./FileItem";

function SearchBar() {
  const [searchInfo, updateSearchInfo] = useState('');
  const [searchlist, updateSearchlist] = useState([]);

  let path = window.location.pathname.substring(5);

  function handleSearch(e){
    console.log(e.target.value)
    updateSearchInfo(e.target.value)
    const dbx = new Dropbox({accessToken: token$.value, fetch});
    dbx.filesSearch({path: path, query: searchInfo})
      .then(res => {
        console.log(res.matches)
        updateSearchlist(res.matches)
      })
  }

  return(
    <div>
      <input type='search'  onChange={handleSearch}/>
    </div>
  )
}

export default SearchBar;
