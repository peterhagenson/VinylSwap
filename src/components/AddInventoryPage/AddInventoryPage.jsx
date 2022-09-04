import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function AddInventory() {

  const dispatch = useDispatch();

  const store = useSelector((store) => store);


  //stores the search term from the input field so it can be dispatched
  const [searchTerm, setSearchTerm] = useState("");

  const getMatches = (event) => {
    // console.log("in get matches", searchTerm)
    dispatch({
      type: 'GET_SEARCH_RESULTS',
      payload: searchTerm
    })

  }

  return (
    <div>
      <h2>Find The Record You'd Like To Add</h2>
      <form onSubmit={() => getMatches()}>
        <input onChange={(event) => (setSearchTerm(event.target.value))} placeholder="artist name or album title" />
        <button type="submit">Find</button>
      </form>
    </div>
  );
}

export default AddInventory;
