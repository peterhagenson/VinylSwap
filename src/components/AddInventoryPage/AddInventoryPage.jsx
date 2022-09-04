import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function AddInventory() {

  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.apiReducer);


  //stores the search term from the input field so it can be dispatched
  const [searchTerm, setSearchTerm] = useState("");

  const getMatches = (event) => {
    // console.log("in get matches", searchTerm)
    dispatch({
      type: 'GET_SEARCH_RESULTS',
      payload: searchTerm
    })
  };

  const selectAlbum = (album) => {
    console.log("clicked", album)
    dispatch({
      type: 'POST_TO_INVENTORY',
      payload: album
    })
  };

  return (
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
                <div onClick={() => selectAlbum(album)} className="apiResultCard">
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
  );
}

export default AddInventory;
