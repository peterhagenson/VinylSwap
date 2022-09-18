import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';



const styles1 = {
  backgroundColor: "black",
  color: "white",
  border: "3px solid black",
  '&:hover': {
    border: "3px solid black",
    color: "black",
    backgroundColor: "white",
    fontWeight: 'bold',
    // boxShadow: 20
  }
}

const styles2 = {
  backgroundColor: "black",
  color: "white",
  border: "solid black",
  '&:hover': {
    border: "solid black",
    color: "black",
    backgroundColor: "white",

  }
}



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function ProfilePage() {

  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((store) => store.profileReducer.data);

  const [heading, setHeading] = useState('Functional Component');
  //----------------------------------------


  //---------------------------------------------

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

  const toAddInventory = () => {
    console.log("clicked")
    history.push('/addInventory')
  }

  const editListing = (id) => {
    history.push(`/completeAddInventory/${id}`)
  }

  return (

    <div >
      <h2 className="userProfilePageTitle">Your Trader Profile</h2>
      <div className="displayContainer">
        <div className="userProfileContainer">
          {/* <h3 className="profileText">{user && user.user.username}</h3>
          <h4 className="profileText">{user && user.user.city}, {user && user.user.state}</h4>
          <h4 className="profileText">{user && user.user.email}</h4> */}
          <div className="profileText profileUserName">{user && user.user.username}</div>
          <div className="profileText">{user && user.user.city}, {user && user.user.state}</div>
          <div className="profileText">{user && user.user.email}</div>
          <div className="profileText bioTitle">Bio: <span className="bioText">{user && user.user.bio}</span></div>
          <Button onClick={navToProfileCompletion} variant="contained" size="small" sx={styles1}>Edit Profile</Button>
          <br />
          <div className="inactiveListings">
            <h3>Your Inactive Inventory</h3>
            {user && user.inventory.map((album) => {
              if (!album.is_active) {
                return (
                  <>
                    <div className="inactiveUserInventoryCard">
                      <div className="inactiveUserInventoryImageContainer">
                        <div className="spacerDiv"></div>
                        <div>
                          <img className="inactiveInventoryImage" src={album.album_art} />
                        </div>
                        <div className="spacerDiv"></div>
                      </div>
                      <div className="inactiveUserInventoryCardDetails">
                        <div className="spacerDiv"></div>
                        <div>
                          <p>{album.artist_name}</p>
                          <p>{album.title}</p>
                        </div>
                        <div className="spacerDiv"></div>

                      </div>
                      <div className="inactiveUserInventoryCardButtonContainer">
                        <div className="btnSpacerDiv"></div>
                        <div className="=inactiveAlbumCardBtnsDiv">
                          <Button className="cardBtn" onClick={() => (editListing(album.discogs_id))} variant="contained" sx={{ ...styles2, width: 90, mb: 1, mt: 1 }} size="small">Edit</Button>
                          <Button className="cardBtn" variant="contained" sx={{ ...styles2, width: 90, mb: 1 }} size="small">Activate</Button>
                          <Button className="cardBtn" variant="contained" sx={{ ...styles2, width: 90, mb: 1 }} size="small" onClick={() => (deleteListing(album.id))}>Delete</Button>
                        </div>
                        <div className="btnSpacerDiv"></div>
                      </div>
                    </div>


                  </>
                )
              }
            })}
          </div>


        </div>

        <div className="userInventoryContainer">
          <div className='inventory_addBtnContainer'>
            <h3>Your Active Inventory</h3>
            <Button onClick={toAddInventory} variant="contained" sx={{ ...styles1 }}>Add Inventory</Button>
          </div>

          {user && user.inventory.map((album) => {
            if (album.is_active) {
              return (
                <>
                  <div className="userInventoryCard">
                    <div className="userInventoryImageContainer">
                      <div className="spacerDiv"></div>
                      <div>
                        <img className="inventoryImage" src={album.album_art} />
                      </div>
                      <div className="spacerDiv"></div>
                    </div>
                    <div className="userInventoryCardDetails">
                      <div className="spacerDiv"></div>
                      <div>
                        <p>{album.artist_name}</p>
                        <p>{album.title}</p>
                      </div>
                      <div className="spacerDiv"></div>
                    </div>
                    <div className="userInventoryCardButtonContainer">
                      <div className="btnSpacerDiv"></div>
                      <div className="albumCardBtnsDiv">
                        <Button className="cardBtn" onClick={() => (editListing(album.discogs_id))} variant="contained" sx={{ ...styles2, width: 90, mb: 1 }} size="small">Edit</Button>
                        <Button className="cardBtn" variant="contained" sx={{ ...styles2, width: 90, mb: 1 }} size="small">Suspend</Button>
                        <Button className="cardBtn" variant="contained" sx={{ ...styles2, width: 90, mb: 1 }} size="small" onClick={() => (deleteListing(album.id))}>Delete</Button>
                      </div>
                      <div className="btnSpacerDiv"></div>
                    </div>
                  </div>


                </>
              )
            }
          })}

        </div>

      </div>
    </div >

  );
}


export default ProfilePage;
