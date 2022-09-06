import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom'




function AlbumDetails() {

  useEffect(() => {
    getDetail();
  }, []);

  const params = useParams();
  const dispatch = useDispatch();

  const details = useSelector((store) => store.albumDetails);
  // const [heading, setHeading] = useState('Functional Component');




  const getDetail = () => {
    // console.log("in getDetail", params.id)
    dispatch({
      type: 'GET_DETAILS',
      payload: params.id
    })
  }




  return (
    <Router>
      <Route path="/detail/:id">

        <div>
          <div className="albumDetailsContainer">
            <div className="albumDetailsText">
              {details.title}
              <br />
              {details.published_date}
              <br />
              {details.record_label}
              <br />
              <p>ADD CONDITION</p>
              <br />
              <p>ADD DESCRIPTION</p>

            </div>
            <img src={details.album_art} />
            <br />
          </div>
          <div className="traderInfoContainer">
            <div className="traderDetails">
              <h3>Album Trader:</h3>
              {details.username}
              <br />
              {details.city}
              <br />
              {details.state}
              <br />
              {details.email}
              <br />
              <button>Trader Page</button>

            </div>
            <div>
              <div className="messagingContainer"></div>
              <br />
              <button>Send Message</button>
            </div>

          </div>

          {/* {details && (details.album[0].title)} */}
          {/* {JSON.stringify(details)} */}
          {/* {params.id} */}




        </div>
      </Route>
    </Router>
  );
}


export default AlbumDetails;
