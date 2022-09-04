import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function SearchAlbums() {

  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.searchReducer);
  const [searchTerm, setSearchTerm] = useState('');

  const getMatches = (event) => {
    console.log('in getMatches', searchTerm);
    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: searchTerm
    })
  }

  const addToInventory = (album) => {
    console.log("in addToInventory. album id: ", album.id)
  }

  return (
    <div>
      <h2>{searchTerm}</h2>
      <form onSubmit={() => getMatches()}>
        <input onChange={(event) => (setSearchTerm(event.target.value))} placeholder="artist name or album title" />
        <button type="submit">Find</button>
      </form>
      <br />
      <div className="resultsContainer">
        {searchResults.map((album) => {
          return (
            <>
              <div onClick={() => addToInventory(album)}>
                <img className="searchImage" src={album.album_art} />
                <div className="apiImageText">
                  <div>{album.title}</div>
                  <div>{album.record_label}</div>
                  <div >{album.published_date}</div>
                  <div>{album.username}</div>
                  <div>{album.city},{album.state}</div>
                </div>
              </div>
            </>

          )
        })
        }

      </div>
    </div>
  );
}

export default SearchAlbums;
