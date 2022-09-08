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
  const history = useHistory();

  const details = useSelector((store) => store.albumDetails);
  // const [heading, setHeading] = useState('Functional Component');




  const getDetail = () => {
    // console.log("in getDetail", params.id)
    dispatch({
      type: 'GET_DETAILS',
      payload: params.id
    })
  }

  const toTraderPage = (id) => {
    console.log('in toTraderPage', id);
    history.push(`/traderPage/${id}`)
  }


  return (


    <div className="detailsDisplayContainer">
      <div className="albumDetails-TraderContainer">
        <div className="albumDetailsText">
          <h3>Album Title: {details.title}</h3>
          <h5 >Year: {details.published_date}</h5>
          <h5>Label: {details.record_label}</h5>
          <h5>Condition: {details.condition}</h5>
          <h5 className="detailsTex">Album Trader's Descriptin: {details.user_description}</h5>
          <h5>Genres: {details.genre}</h5>
        </div>
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
          <button onClick={() => (toTraderPage(details.user_id))}>Trader Page</button>
        </div>
      </div>
      <div className="imagesAndMessageContainer">
        <div className="detailImagesContainer">
          <img className="detailPageImage" src={details.album_art} />
        </div>
        <div className="messageContainer">
          <div className="messageBox"></div>
          <button>Submit</button>
        </div>
      </div>
    </div>

  );
}


export default AlbumDetails;
