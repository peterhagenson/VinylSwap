import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory, useParams } from 'react-router-dom';

// TODO: use effect that pulls album info to display and put route to add details

function inventoryCompletion() {

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const album = useSelector((store) => store.albumToAdd);
  const [condition, setAlbumCondition] = useState('');
  const [description, setAlbumDescription] = useState('');

  useEffect(() => {
    getAlbumToComplete();
  }, []);

  const getAlbumToComplete = () => {
    dispatch({
      type: 'FETCH_ALBUM_TO_ADD',
      payload: params.id
    })
  };

  const updateAlbum = () => {
    console.log("submitted", condition, description, album, params.id)
    dispatch({
      type: "ADD_ALBUM_DESCRIPTORS",
      payload: {
        condition: condition,
        description: description,
        discogsID: params.id
      }
    });
    history.push('/userProfile')
  }



  return (
    <>
      <p>Please provide the condition and a brief description of your album. Your listing will not be active until this step is complete.</p>
      <div className="completeAddInventoryContainer">
        <div className="editDescriptionContainer">
          <form onSubmit={updateAlbum}>
            <label>Select Condition</label>
            <br />
            <select onChange={(event) => setAlbumCondition(event.target.value)} >
              <option>Please Select</option>
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
        </div>
        <div className="albumInfoContainer">
          <img className="completeDescriptionImage" src={album[0] && album[0].album_art} />
        </div>


      </div>
      {JSON.stringify(album)}
    </>
  );
}

export default inventoryCompletion;
