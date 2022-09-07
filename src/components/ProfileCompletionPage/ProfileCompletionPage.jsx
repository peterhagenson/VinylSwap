import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function CompleteProfile() {

  const dispatch = useDispatch();
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [bio, setBio] = useState('');

  const addProfileInfo = () => {
    console.log(city, state, bio);
    dispatch({
      type: "SEND_PROFILE",
      payload: {
        email: email,
        city: city,
        state: state,
        bio: bio
      }
    })
    history.push('/userProfile')
  }

  return (

    <div>
      <h2>Please Complete/Edit Your User Profile</h2>
      <br />
      <form onSubmit={addProfileInfo}>
        <input onChange={(event) => setEmail(event.target.value)} placeholder="your email"></input>
        <br />
        <input onChange={(event) => setCity(event.target.value)} placeholder="your city"></input>
        <br />
        <input onChange={(event) => setState(event.target.value)} placeholder="your state"></input>
        <br />
        <textarea onChange={(event) => setBio(event.target.value)} placeholder="your bio"></textarea>
        <br />
        <button type="submit">Submit</button>
        <button>Clear</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
