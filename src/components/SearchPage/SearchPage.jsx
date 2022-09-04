import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function SearchAlbums() {

  const dispatch = useDispatch();

  const store = useSelector((store) => store);
  const [searchTerm, setSearchTerm] = useState('');

  const getMatches = (event) => {
    console.log('in getMatches', searchTerm);
    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: searchTerm
    })

  }

  return (
    <div>
      <h2>{searchTerm}</h2>
      <form onSubmit={() => getMatches()}>
        <input onChange={(event) => (setSearchTerm(event.target.value))} placeholder="artist name or album title" />
        <button type="submit">Find</button>
      </form>
    </div>
  );
}

export default SearchAlbums;
