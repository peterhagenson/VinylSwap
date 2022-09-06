import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function SearchAlbums() {

  const dispatch = useDispatch();

  const history = useHistory();

  // searchResults pulls the search results from the store to display on the DOM
  const searchResults = useSelector((store) => store.searchReducer);

  const [searchTerm, setSearchTerm] = useState('');

  // getMatches dispatches the search term to the search.saga.js file
  const getMatches = (event) => {
    // console.log('in getMatches', searchTerm);
    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: searchTerm
    })
  }

  // toAlbumDetail pushes the user to the AlbumDetailPage
  const toAlbumDetail = (album) => {
    // console.log(searchResults);
    console.log("in toAlbumDetail, album id: ", album.id)
    history.push(`/detail/${album.id}`)
  }

  return (
    <Router>
      <Route path="/search">
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
                  <div onClick={() => toAlbumDetail(album)}>
                    <img className="searchImage" src={album.album_art} />
                    <div className="apiImageText">
                      <div>{album.title}</div>
                      <div>{album.record_label}</div>
                      <div >{album.published_date}</div>

                    </div>
                  </div>
                </>

              )
            })
            }

          </div>
        </div>
      </Route>
    </Router>
  );
}

export default SearchAlbums;
