import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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

    <div>
      <div className="searchFormDiv">
        <h2>{searchTerm}</h2>
        <form onSubmit={() => getMatches()}>
          <TextField onChange={(event) => (setSearchTerm(event.target.value))} variant="filled"
            size="small" style={{ width: 300 }} placeholder="artist name or album title" value={searchTerm} />
          <br />
          <Button variant="contained" sx={{ color: 'white', backgroundColor: 'purple', borderColor: 'purple' }} type="submit" >Find</Button>
          <Button variant="outlined" onClick={() => setSearchTerm('')}>Clear</Button>
        </form>
      </div>
      <br />
      {/* <div className="resultsContainer"> */}
      {searchResults.map((album) => {
        return (
          <>
            <div className="resultsContainer" onClick={() => toAlbumDetail(album)}>
              <img className="searchImage" src={album.album_art} />
              <div className="apiImageText">
                <div className="searchCardText">
                  <div>{album.title}</div>
                  <div>{album.artist_name}</div>
                  <div>{album.record_label}</div>
                  <div>{album.published_date}</div>
                </div>
              </div>
            </div>
          </>

        )
      })
      }

      {/* </div> */}
    </div>
  );
}

export default SearchAlbums;
