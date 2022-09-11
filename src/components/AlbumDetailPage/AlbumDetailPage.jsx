import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");






function AlbumDetails() {


  // useEffect(() => {
  //   getDetail();
  // }, []);

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const details = useSelector((store) => store.albumDetails);
  // const [heading, setHeading] = useState('Functional Component');

  //---------------------------------
  // //Room State
  const [room, setRoom] = useState("");

  // //Message States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");


  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    console.log("in sendMessage", message, room)
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    getDetail();
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  //-----------------------------------


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
          <h3 className="detailsText">Album Title: {details.title}</h3>
          <h5 className="detailsText">Year: {details.published_date}</h5>
          <h5 className="detailsText">Label: {details.record_label}</h5>
          <h5 className="detailsText">Condition: {details.condition}</h5>
          <h5 className="detailsText">Album Trader's Descriptin: {details.user_description}</h5>
          <h5>Genres: {details.genre}</h5>
        </div>
        <div className="traderDetails">
          <h3>Album Trader:</h3>
          <p>Username: <span>{details.username}</span></p>
          <p>City/State: <span>{details.city}, {details.state}</span></p>
          <p>Email: <span>{details.email}</span></p>
          <Button onClick={() => (toTraderPage(details.user_id))} variant="contained" sx={{ color: 'white', backgroundColor: 'black' }} >Trader Page</Button>
        </div>
      </div>
      <div className="imagesAndMessageContainer">
        <div className="detailImagesContainer">
          <img className="detailPageImage" src={details.album_art} />
        </div>
        <div className="messageContainer">
          <div className="App">
            <input onChange={(event) => (setRoom(event.target.value))} placeholder="room number" />
            <button onClick={joinRoom}>Join Room</button>
            <br />
            <input onChange={(event) => (setMessage(event.target.value))} placeholder="message" />
            <button onClick={sendMessage}>Send Message</button>
            <h1>Message:</h1>
            {messageReceived}
            {room}

          </div>
          <div className="messageBox"></div>
          <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black' }} >Submit</Button>
        </div>
      </div>
    </div>

  );
}


export default AlbumDetails;
