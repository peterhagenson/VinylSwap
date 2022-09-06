import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';

// TODO: use effect that pulls album info to display and put route to add details

function inventoryCompletion() {

  const dispatch = useDispatch();

  const album = useSelector((store) => store.albumToAdd);
  const [condition, setAlbumCondition] = useState('');
  const [description, setAlbumDescription] = useState('');

  // useEffect(() => {

  // }, [])

  // 



  return (
    <Router>
      <Route path="/completeAddInventory">
        <div>
          <form onSubmit={sendAlbum}>
            <label>Select Condition</label>
            <br />
            <select onChange={(event) => setAlbumCondition(event.target.value)} >
              <option value="Mint">Mint</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <br />
            <textarea onChange={(event) => setAlbumDescription(event.target.value)} placeholder="description"></textarea>
            <br />
            <button type="submit">Submit</button>
          </form>
          <br />
          {JSON.stringify(album)}

        </div>
      </Route>
    </Router>
  );
}

export default inventoryCompletion;
