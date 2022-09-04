import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProfilePage() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.profileReducer);
  const inventory = useSelector((store) => store.userInventoryReducer)


  const [heading, setHeading] = useState('Functional Component');

  const getProfile = () => {
    // console.log("in getProfile")
    dispatch({
      type: "GET_USER"
    })
  }

  const getInventory = () => {
    //dispatch is going to the profile.saga
    dispatch({
      type: "GET_USER_INVENTORY"
    })
  }

  useEffect(() => {
    getProfile();
    getInventory();
  }, [])

  return (
    <div>
      <h2>Your Trader Profile</h2>
      <p>{user.username}</p>
      <p>{inventory[0].title}</p>


    </div>
  );
}

export default ProfilePage;
