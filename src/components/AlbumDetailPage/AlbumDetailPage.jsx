import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

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






function AlbumDetails() {


  useEffect(() => {
    getDetail();
  }, []);

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const details = useSelector((store) => store.albumDetails);
  const [message, setMessage] = useState('');
  // const [heading, setHeading] = useState('Functional Component');

  //---------------------------------
  // //Room State
  // const [room, setRoom] = useState("");

  // // //Message States
  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");


  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room)
  //   }
  // }

  // const sendMessage = () => {
  //   console.log("in sendMessage", message, room)
  //   socket.emit("send_message", { message, room, details });
  // };

  // useEffect(() => {
  //   getDetail();
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data.message);
  //   })
  // }, [socket])

  //-----------------------------------


  const getDetail = () => {
    console.log("in getDetail")
    dispatch({
      type: 'GET_DETAILS',
      payload: params.id
    })
  }

  const toTraderPage = (id) => {
    console.log('in toTraderPage', id);
    history.push(`/traderPage/${id}`)
  }

  const sendMessage = (event) => {
    event.preventDefault();
    let code = Math.floor(Math.random() * 100) + 1;
    console.log('in send message', message)
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        message: message,
        albumId: details.id,
        recipientId: details.user_id,
        code: code
      }

    })
    setMessage('');
  }


  return (


    <div className="detailsDisplayContainer">
      <div className="albumDetails-TraderContainer">
        <div className="albumDetailsText">
          <h5 className="detailsText ">Album Title: <span className="notBold titleHeading">{details.title}</span></h5>
          <h5 className="detailsText">Artist: <span className="notBold">{details.artist_name}</span></h5>
          <h5 className="detailsText">Year: <span className="notBold">{details.published_date}</span></h5>
          <h5 className="detailsText">Label: <span className="notBold">{details.record_label}</span></h5>
          <h5 className="detailsText">Condition: <span className="notBold">{details.condition}</span></h5>
          <h5 className="detailsText">Description: <span className="notBold">{details.user_description}</span></h5>
          {/* <h5>Genres: {details.genre}</h5> */}
        </div>
        <div className="traderDetails">
          <h3>Album Trader:</h3>
          <p><span>{details.username}</span></p>
          <p><span>{details.city}, {details.state}</span></p>
          <p><span>{details.email}</span></p>
          <Button onClick={() => (toTraderPage(details.user_id))} variant="contained" sx={{ ...styles1 }} >Trader Page</Button>
        </div>
      </div>
      <div className="imagesAndMessageContainer">
        <div className="detailImagesContainer">
          <img className="detailPageImage" src={details.album_art} />
        </div>
        <div className="messageContainer">
          <h3>Message Trader About This Album:</h3>
          <form onSubmit={sendMessage}>
            <TextField onChange={(event) => setMessage(event.target.value)} sx={{ backgroundColor: 'white', mb: 2 }} variant="outlined" multiline rows={5} style={{ width: 500 }} value={message} placeholder="your message"></TextField>
            {/* <div className="App">
            <input onChange={(event) => (setRoom(event.target.value))} placeholder="room number" />
            <button onClick={joinRoom}>Join Room</button>
            <br />
            <input onChange={(event) => (setMessage(event.target.value))} placeholder="message" />
            <button onClick={sendMessage}>Send Message</button>
            <h1>Message:</h1>
            {messageReceived}
            {room}
             

          </div> */}

            <Button type="submit" variant="contained" sx={{ ...styles1, mr: 1 }} >Send</Button>
            <Button variant="contained" sx={{ ...styles1, ml: 1 }} >Clear</Button>
          </form>
          {/* {JSON.stringify(details)} */}
        </div>
      </div>
    </div>

  );
}


export default AlbumDetails;
