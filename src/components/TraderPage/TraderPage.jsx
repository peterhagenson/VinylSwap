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





  // const [heading, setHeading] = useState('Functional Component');

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
          <h3>Album Trader</h3>
          <h4 className="detailsText notBold">{trader.profile && trader.profile.username}</h4>
          <h4 className="detailsText notBold">{trader.profile && trader.profile.city}, {trader.profile && trader.profile.state}</h4>
          <h4 className="detailsText notBold">{trader.profile && trader.profile.email}</h4>
          <h4 className="detailsText">Bio: <span className="notBold">{trader.profile && trader.profile.bio}</span></h4>
          {/* <button onClick={navToProfileCompletion}>Edit Profile</button> */}
        </div>

        <div className="traderInventoryContainer">
          <h3>Trader Inventory</h3>
          {trader.albums && trader.albums.map((album) => {
            if (album.is_active) {
              return (
                <>
                  <div onClick={() => toAlbumDetail(album)} className="traderInventoryCard">
                    <div className="inventoryImageContainer">
                      <div></div>
                      <img className="inventoryImage" src={album.album_art} />
                      <div></div>
                    </div>
                    <div className="artistAlbumContainer">
                      <div></div>
                      <div>
                        <p className="bold">Artist/Album:</p>
                        <p>{album.artist_name}</p>
                        <p>{album.title}</p>
                      </div>
                      <div></div>
                    </div>
                    <div lassName="publishedYearContainer">
                      <div className="spacerDiv"></div>
                      <div>
                        <p className="bold">Published:</p>
                        <p>{album.published_date}</p>
                      </div>
                      <div className="spacerDiv"></div>
                    </div>
                    <div lassName="conditionContainer">
                      <div className="spacerDiv"></div>
                      <div>
                        <p className="bold">Condition:</p>
                        <p>{album.condition}</p>
                      </div>
                      <div className="spacerDiv"></div>
                    </div>
                    <div>

                    </div>
                  </div>

                </>
              )
            }
          })}

        </div>

        {/* // <p>{trader.albums && trader.albums[0].title}</p>
        // <br />
        // {trader.profile && trader.profile.username} */}
        {/* <h2>{JSON.stringify(trader.albums)}</h2> */}

      </div>

    );
  }
}

export default TemplateFunction;
