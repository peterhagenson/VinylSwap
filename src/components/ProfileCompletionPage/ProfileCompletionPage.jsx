import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom'
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


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CompleteProfile() {



  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const profile = useSelector((store) => store.profileReducer);

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [bio, setBio] = useState('');

  const addProfileInfo = (event) => {
    event.preventDefault();
    console.log(city, state, bio);
    dispatch({
      type: "SEND_PROFILE",
      payload: {
        email: email,
        city: city,
        state: state,
        bio: bio,
      }
    })
    history.push('/welcome');
  }

  const getProfile = (event) => {

    dispatch({
      type: 'GET_USER'
    })
  }
  console.log('profile', profile.data);

  useEffect(() => {
    getProfile();
  }, []);



  return (

    <div className="pageContainer">
      <h2>Please Complete/Edit Your User Profile</h2>
      <p className="bold">Username: <span className="notBold">{profile.data && profile.data.user.username}</span></p>
      <p className="bold">email: <span className="notBold">{profile.data && profile.data.user.email}</span></p>
      <p className="bold">City/State: <span className="notBold">{profile.data && profile.data.user.city}, {profile.data && profile.data.user.state}</span></p>
      <p className="bold">Bio: <span className="notBold">{profile.data && profile.data.user.bio}</span></p>


      <br />
      <form onSubmit={addProfileInfo}>
        <TextField onChange={(event) => setEmail(event.target.value)} size="small" sx={{ backgroundColor: 'white', mb: 2 }} placeholder="your email"></TextField>
        <br />
        <TextField onChange={(event) => setCity(event.target.value)} size="small" sx={{ backgroundColor: 'white', mb: 2 }} placeholder="your city"></TextField>
        <br />
        <TextField onChange={(event) => setState(event.target.value)} size="small" sx={{ backgroundColor: 'white', mb: 2 }} placeholder="your state"></TextField>
        <br />
        <TextField onChange={(event) => setBio(event.target.value)} size="small" sx={{ backgroundColor: 'white', mb: 2 }} variant="outlined" multiline rows={5} style={{ width: 500 }} placeholder="your bio"></TextField>
        <br />
        <Button variant="contained" sx={{ ...styles1, mr: 1 }} type="submit">Submit</Button>
        <Button variant="contained" sx={{ ...styles1, ml: 1 }}>Clear</Button>
      </form>
    </div>
  );
}

export default CompleteProfile;
