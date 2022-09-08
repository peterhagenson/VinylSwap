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
          {details.title}
          <br />
          {details.published_date}
          <br />
          {details.record_label}
          <br />
          {details.condition}
          <br />
          {details.user_description}
          <br />
          {details.genre}
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
        <div classNaem="detailImagesContainer">
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
