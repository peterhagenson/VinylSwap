import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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
    history.push('/userProfile')
  }

  const getProfile = (event) => {
    console.log()
    dispatch({
      type: 'GET_USER'
    })
  }
  console.log('profile', profile.data);

  useEffect(() => {
    getProfile();
  }, []);



  return (

    <div>
      <h2>Please Complete/Edit Your User Profile</h2>
      <p>Username: {profile.data && profile.data.user.username}</p>
      <p>email: {profile.data && profile.data.user.email}</p>
      <p>City/State: {profile.data && profile.data.user.city}, {profile.data && profile.data.user.state}</p>
      <p>Bio: {profile.data && profile.data.user.bio}</p>


      <br />
      <form onSubmit={addProfileInfo}>
        <TextField onChange={(event) => setEmail(event.target.value)} size="small" sx={{ backgroundColor: 'white' }} placeholder="your email"></TextField>
        <br />
        <TextField onChange={(event) => setCity(event.target.value)} size="small" sx={{ backgroundColor: 'white' }} placeholder="your city"></TextField>
        <br />
        <TextField onChange={(event) => setState(event.target.value)} size="small" sx={{ backgroundColor: 'white' }} placeholder="your state"></TextField>
        <br />
        <TextField onChange={(event) => setBio(event.target.value)} size="small" sx={{ backgroundColor: 'white' }} variant="outlined" multiline rows={5} style={{ width: 500 }} placeholder="your bio"></TextField>
        <br />
        <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black' }} type="submit">Submit</Button>
        <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black' }}>Clear</Button>
      </form>
    </div>
  );
}

export default CompleteProfile;
