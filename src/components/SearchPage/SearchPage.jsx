import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const styles1 = {
  backgroundColor: "black",
  color: "white",
  border: "3px solid black",
  '&:hover': {
    border: "3px solid black",
    color: "black",
    backgroundColor: "white",
    fontWeight: 'bold'
  }
}

const styles2 = {
  backgroundColor: "white",
  color: "black",
  border: "2px solid black",
  '&:hover': {
    color: "white",
    backgroundColor: "black",
  }
}



function SearchAlbums() {

  const dispatch = useDispatch();

  const history = useHistory();

  // searchResults pulls the search results from the store to display on the DOM
  const searchResults = useSelector((store) => store.searchReducer);
  const allAlbums = useSelector((store) => store.allAlbums)

  const [searchTerm, setSearchTerm] = useState('');

  // getMatches dispatches the search term to the search.saga.js file
  const getMatches = (event) => {
    event.preventDefault();

    // console.log('in getMatches', searchTerm);
    dispatch({
      type: 'FETCH_SEARCH_RESULTS',
      payload: searchTerm
    })
    setSearchTerm('');
  }

  // toAlbumDetail pushes the user to the AlbumDetailPage
  const toAlbumDetail = (album) => {
    // console.log(searchResults);
    console.log("in toAlbumDetail, album id: ", album.id)
    setSearchTerm('')
    history.push(`/detail/${album.id}`)
  }

  // getAllAlbums gets all of the albums in the database so the user can browse the collection
  const getAllAlbums = () => {
    dispatch({
      type: 'GET_ALL_ALBUMS',
    })
  }

  // triggers getAllAlbums on page load
  useEffect(() => {
    getAllAlbums();
  }, [])

  return (

    <div>
      <div className="searchFormDiv">
        {/* <h2>{searchTerm}</h2> */}
        {/* <form onSubmit={() => getMatches()}> */}
        <form onSubmit={getMatches}>
          <TextField onChange={(event) => (setSearchTerm(event.target.value))} variant="outlined"
            size="small" style={{ width: 400 }} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={searchTerm} />
          <br />
          <Button variant="contained" sx={{ ...styles1, mt: 2, mr: 1 }} type="submit" >Search</Button>
          <Button variant="contained" sx={{ ...styles1, mt: 2, ml: 1, width: '98px' }} onClick={() => setSearchTerm('')}>Clear</Button>
        </form>
      </div>
      <br />
      {/* <div className="resultsContainer"> */}
      <h3 className="searchHeading">Your Search Results:</h3>
      <div className="allResultsContainer">
        <div></div>
        {searchResults.map((album) => {
          if (album.is_active) {
            return (
              <>
                <div className="resultsContainer" onClick={() => toAlbumDetail(album)}>
                  <img className="searchImage" src={album.album_art} />
                  <div className="apiImageText">
                    <div className="searchCardText">
                      <div className="albumTitle">{album.title}</div>
                      <div>{album.artist_name}</div>
                      <div>{album.record_label}</div>
                      <div>{album.published_date}</div>
                    </div>
                  </div>
                </div>
              </>

            )
          }
        })
        }
        <div></div>
      </div>
      <h3 className="searchHeading">Browse All Available Albums:</h3>
      <div className="allAlbumsContainer">

        {allAlbums.map((album) => {
          if (album.is_active) {
            return (
              <>
                <div className="albumCardContainer" onClick={() => toAlbumDetail(album)}>
                  <img className="searchImage" src={album.album_art} />
                  <div className="apiImageText">
                    <div className="searchCardText">
                      <div className="albumTitle">{album.title}</div>
                      <div>{album.artist_name}</div>
                      <div>{album.record_label}</div>
                      <div>{album.published_date}</div>
                    </div>
                  </div>
                </div>
              </>

            )
          }
        })
        }
      </div>
      {/* </div> */}
    </div>

  );

}

export default SearchAlbums;
