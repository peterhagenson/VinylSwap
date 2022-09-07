import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProfilePage() {

  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((store) => store.profileReducer.data);



  const [heading, setHeading] = useState('Functional Component');

  // const getProfile = () => {
  //   // console.log("in getProfile")
  //   dispatch({
  //     type: "GET_USER"
  //   })

  // }


  useEffect(() => {
    // getProfile();
    dispatch({
      type: "GET_USER"
    });
  }, []);

  const navToProfileCompletion = () => {
    console.log('clicked');
    history.push('/profileCompletion')
  }

  // deleteListing dispatches the listing id to the deleteAlbum saga in the inventory.saga.js file
  const deleteListing = (id) => {
    console.log(id)
    dispatch({
      type: "DELETE_LISTING",
      payload: id
    })

  }


  return (

    <div>
      <h2>Your Trader Profile</h2>
      <div className="displayContainer">
        <div className="userProfileContainer">
          <h3>Username: {user && user.user.username}</h3>
          <h4>{user && user.user.city}, {user && user.user.state}</h4>
          <h4>{user && user.user.email}</h4>
          <h4>Bio: <span>{user && user.user.bio}</span></h4>
          <button onClick={navToProfileCompletion}>Edit Profile</button>
        </div>

        <div className="userInventoryContainer">
          <h3>Your Inventory</h3>
          {user && user.inventory.map((album) => {
            return (
              <>
                <div className="userInventoryCard">
                  <img className="inventoryImage" src={album.album_art} />
                  <p>{album.title}</p>
                  <div>
                    <button>Suspend</button>
                    <br />
                    <button onClick={() => (deleteListing(album.id))}>Delete</button>
                  </div>
                </div>

              </>
            )
          })}

        </div>
      </div>
    </div >

  );
}

export default ProfilePage;
