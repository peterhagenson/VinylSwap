import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProfilePage() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.profileReducer);
  const inventory = useSelector((store) => store.userInventoryReducer);


  const [heading, setHeading] = useState('Functional Component');

  const getProfile = () => {
    // console.log("in getProfile")
    dispatch({
      type: "GET_USER"
    })
    dispatch({
      type: "GET_USER_INVENTORY"
    })
  }

  // const getInventory = () => {
  //   //dispatch is going to the profile.saga
  //   dispatch({
  //     type: "GET_USER_INVENTORY"
  //   })
  // }

  useEffect(() => {
    getProfile();
    // setTimeout(getInventory(), 20000);
  }, [])

  return (
    <div>
      <h2>Your Trader Profile</h2>
      <div className="displayContainer">
        <div className="userProfileContainer">
          <h3>Username: {user.username}</h3>
          <h4>{user.city}, {user.state}</h4>
          <h4>{user.email}</h4>
          <h4>Bio: <span>{user.bio}</span></h4>
        </div>

        <div className="userInventoryContainer">
          <h3>Your Inventory</h3>
          {/* 
          {

            inventory.map((album) => {
              return (
                <>
                  <div className="userInventoryCard">
                    <img className="inventoryImage" src={album.album_art} />
                    <div>{album.title}</div>
                    <div>
                      <button>Suspend</button>
                      <br />
                      <button>Delete</button>
                    </div>
                  </div>
                </>
              )
            })

          } */}



          {/* <p>{inventory[0].title}</p> */}
        </div>
      </div>


    </div >
  );
}

export default ProfilePage;
