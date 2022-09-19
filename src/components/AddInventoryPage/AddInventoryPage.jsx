import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
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



function AddInventory() {

  const dispatch = useDispatch();

  const history = useHistory();

  const searchResults = useSelector((store) => store.apiReducer);


  //stores the search term from the input field so it can be dispatched
  const [searchTerm, setSearchTerm] = useState("");

  // getMatches 
  const getMatches = (event) => {
    event.preventDefault();
    console.log("in get matches", searchTerm)
    dispatch({
      type: 'GET_SEARCH_RESULTS',
      payload: searchTerm
    })
    setSearchTerm('');
  };

  // sends the chosen album to the albumToAdd reducer  and directs user to the CompleteAddInventory page
  // const albumToAdd = (album) => {
  //   dispatch({
  //     type: 'ALBUM_TO_ADD',
  //     payload: album
  //   })
  // }

  const sendAlbum = (album) => {
    event.preventDefault();
    console.log('clicked', album);
    dispatch({
      type: 'POST_TO_INVENTORY_NO_DUPES',
      payload: album,
      callback: () => history.push(`/completeAddInventory/${album.id}`)
    })

    //the id in this parameter is the id from Discogs, not the id from VinylSwap

  };

  console.log('rendered inventory page')

  return (

    <div>
      <div className="addInventoryForm">
        <h2>Find The Album You'd Like To Upload</h2>
        <form onSubmit={(e) => getMatches(e)}>
          <TextField onChange={(event) => (setSearchTerm(event.target.value))} variant="outlined"
            size="small" style={{ width: 400 }} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={searchTerm} />
          <br />
          <Button type="submit" variant="contained" sx={{ ...styles1, mt: 2, mr: 1 }}>Find</Button>
          <Button onClick={() => setSearchTerm('')} variant="contained" sx={{ ...styles1, mt: 2, ml: 1 }}>Clear</Button>
        </form>
      </div>

      <div className="apiResultsContainer">

        {searchResults.map((album) => {
          if (album.cover_image && Array.isArray(album.label) && album.format.includes('Vinyl')) {
            return (
              <>
                <div onClick={() => sendAlbum(album)} className="apiResultCard">
                  <img className="apiImage" src={album.cover_image} />
                  <div className="apiImageText">
                    <div className="albumTitle">{album.title}</div>
                    {album.label && <div>{album.label[0]}</div>}
                    <div >{album.year}</div>
                  </div>
                </div>
              </>
            )
          }
        })
        }
      </div>

      {/* 
      <p>{searchResults[0].country}</p>
      <p>{searchResults[0].title}</p>
      <img class="apiImage" src={searchResults[0].cover_image} /> */}


      {/* <p>{searchResults[0]}</p> */}
    </div >

  );
}

export default AddInventory;
