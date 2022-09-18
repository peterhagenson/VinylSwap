import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

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

  const updateAlbum = (event) => {
    event.preventDefault();
    console.log("submitted", condition, description, album, params.id)
    dispatch({
      type: "ADD_ALBUM_DESCRIPTORS",
      payload: {
        condition: condition,
        description: description,
        discogsID: params.id
      }
    });
    // history.push('userProfile')
    setAlbumCondition('');
    setAlbumDescription('');
  }

  const resetConditionAndDescription = () => {
    setAlbumCondition('');
    setAlbumDescription('');
  }

  const toProfile = () => {
    history.push('/userProfile')
  }



  return (
    <>
      {/* <p className="instructionText">Please provide the condition and a brief description of your album. Your listing will not be active until this step is complete.</p> */}
      <div className="completeAddInventoryFullDisplay">
        {/* <div className="completeAddInventoryContainer"> */}
        <div className="albumInfoContainer">
          <img className="completeDescriptionImage" src={album[0] && album[0].album_art} />
        </div>
        <div className="album-Details-Container">
          <h3 className="detailsText">Album Title: <span className="detailsTextNotBold">{album[0] && album[0].title}</span></h3>
          <h5 className="detailsText">Artist: <span className="detailsTextNotBold">{album[0] && album[0].artist_name}</span></h5>
          <h5 className="detailsText">Year: <span className="detailsTextNotBold">{album[0] && album[0].published_date}</span></h5>
          <h5 className="detailsText">Label: <span className="detailsTextNotBold">{album[0] && album[0].record_label}</span></h5>
          {/* <h5>Genres: {album[0] && album[0].genre}</h5> */}
          <h5>Condition: <span className="detailsTextNotBold">{album[0] && album[0].condition}</span></h5>
          <h5>Description: <span className="detailsTextNotBold">{album[0] && album[0].user_description}</span></h5>

        </div>


        {/* </div> */}
      </div>
      <div className="editDescriptionContainer">
        <form onSubmit={updateAlbum}>
          <br />
          <InputLabel>Condition</InputLabel>
          <Select onChange={(event) => setAlbumCondition(event.target.value)} sx={{ backgroundColor: 'white', mb: 2 }} style={{ width: 120 }} size="small" value={condition} label="Condition">
            {/* <option>Please Select</option> */}
            <MenuItem value={"Mint"}>Mint</MenuItem>
            <MenuItem value={"Excellent"}>Excellent</MenuItem>
            <MenuItem value={"Very Good"}>Very Good</MenuItem>
            <MenuItem value={"Good"}>Good</MenuItem>
            <MenuItem value={"Fair"}>Fair</MenuItem>
            <MenuItem value={"Poor"}>Poor</MenuItem>
          </Select>
          <br />
          <TextField onChange={(event) => setAlbumDescription(event.target.value)} size="small" variant="outlined" sx={{ backgroundColor: 'white', mb: 2 }} multiline rows={4} style={{ width: 400 }} value={description} placeholder="description" />
          <br />
          <Button variant="contained" sx={{ ...styles1, mr: 1 }} type="submit">Submit</Button>
          <Button variant="contained" sx={{ ...styles1, ml: 1 }} onClick={resetConditionAndDescription}>Clear</Button>
        </form>
        <br />
        <Button variant="contained" sx={{ ...styles1 }} onClick={toProfile}>To Profile</Button>
      </div>
      {/* {JSON.stringify(album)} */}
    </>
  );
}

export default inventoryCompletion;
