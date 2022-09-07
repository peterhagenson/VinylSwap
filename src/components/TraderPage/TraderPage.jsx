import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TemplateFunction() {

  const params = useParams();

  const dispatch = useDispatch();

  const history = useHistory();






  const trader = useSelector((store) => store.traderReducer);
  const [heading, setHeading] = useState('Functional Component');

  const getTrader = () => {
    // console.log(params.id);
    dispatch({
      type: "GET_TRADER",
      payload: params.id
    });
  }

  const toAlbumDetail = (album) => {
    console.log("in toAlbumDetial")
    history.push(`/detail/${album.id}`)
  }


  useEffect(() => {
    getTrader();

  }, []);

  if (trader) {
    return (


      <div className="traderPageContainer">
        <div className="traderProfileContainer">
          <h3>Username: {trader.profile && trader.profile.username}</h3>
          <h4>{trader.profile && trader.profile.city}, {trader.profile && trader.profile.state}</h4>
          <h4>{trader.profile && trader.profile.email}</h4>
          <h4>Bio: <span>{trader.profile && trader.profile.bio}</span></h4>
          {/* <button onClick={navToProfileCompletion}>Edit Profile</button> */}
        </div>

        <div className="traderInventoryContainer">
          <h3>Trader Inventory</h3>
          {trader.albums && trader.albums.map((album) => {
            return (
              <>
                <div onClick={() => toAlbumDetail(album)} className="traderInventoryCard">
                  <img className="inventoryImage" src={album.album_art} />
                  <div>


                    <p>Artist/Album</p>
                    <p>{album.artist_name}</p>
                    <p>{album.title}</p>
                  </div>
                  <div>
                    <p>Label:</p>
                    <p>{album.record_label}</p>
                  </div>
                  <div>
                    <p>Condition:</p>
                    <p>{album.condition}</p>
                  </div>
                  <div>

                  </div>
                </div>

              </>
            )
          })}

        </div>
        {/* 
        <p>{trader.albums && trader.albums[0].title}</p>
        <br />
        {trader.profile && trader.profile.username}
        <h2>{JSON.stringify(trader)}</h2> */}

      </div>

    );
  }
}

export default TemplateFunction;
