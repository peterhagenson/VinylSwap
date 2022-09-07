import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';



function AddInventory() {

  const dispatch = useDispatch();

  const history = useHistory();

  const searchResults = useSelector((store) => store.apiReducer);


  //stores the search term from the input field so it can be dispatched
  const [searchTerm, setSearchTerm] = useState("");

  // getMatches 
  const getMatches = (event) => {
    // console.log("in get matches", searchTerm)
    dispatch({
      type: 'GET_SEARCH_RESULTS',
      payload: searchTerm
    })
  };

  // sends the chosen album to the albumToAdd reducer  and directs user to the CompleteAddInventory page
  // const albumToAdd = (album) => {
  //   dispatch({
  //     type: 'ALBUM_TO_ADD',
  //     payload: album
  //   })
  // }

  const sendAlbum = (album) => {
    console.log('clicked');
    dispatch({
      type: 'POST_TO_INVENTORY',
      payload: album
    })
    dispatch({
      type: 'ALBUM_TO_ADD',
      payload: album
    })
    //the id in this parameter is the id from Discogs, not the id from VinylSwap
    history.push(`/completeAddInventory/${album.id}`)
  };


  return (
    <Router>
      <Route path="/addInventory">
        <div>
          <h2>Find The Record You'd Like To Add</h2>
          <form onSubmit={() => getMatches()}>
            <input onChange={(event) => (setSearchTerm(event.target.value))} placeholder="artist name or album title" />
            <button type="submit">Find</button>
          </form>
          <div className="apiResultsContainer">

            {searchResults.map((album) => {
              if (album.cover_image && Array.isArray(album.label) && album.format.includes('Vinyl')) {
                return (
                  <>
                    <div onClick={() => sendAlbum(album)} className="apiResultCard">
                      <img className="apiImage" src={album.cover_image} />
                      <div className="apiImageText">
                        <div>{album.title}</div>
                        <div>{album.label[0]}</div>
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
      </Route>
    </Router>
  );
}

export default AddInventory;
