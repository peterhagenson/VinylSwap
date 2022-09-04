import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProfilePage() {

  const dispatch = useDispatch();

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




  return (
    <Router>
      <Route path="/userProfile">
        <div>
          <h2>Your Trader Profile</h2>
          <div className="displayContainer">
            <div className="userProfileContainer">
              <h3>Username: {user && user.user.username}</h3>
              <h4>{user && user.user.city}, {user && user.user.state}</h4>
              <h4>{user && user.user.email}</h4>
              <h4>Bio: <span>{user && user.user.bio}</span></h4>
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
                        <button>Delete</button>
                      </div>
                    </div>

                  </>
                )
              })}

            </div>
          </div>
        </div >
      </Route>
    </Router>
  );
}

export default ProfilePage;
