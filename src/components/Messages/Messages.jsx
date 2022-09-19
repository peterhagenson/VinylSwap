import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const styles1 = {
  backgroundColor: "black",
  color: "white",
  border: "3px solid black",
  '&:hover': {
    border: "3px solid black",
    color: "black",
    backgroundColor: "white",
    fontWeight: 'bold'
  }
}



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Messages() {

  const params = useParams();
  const dispatch = useDispatch();

  const messages = useSelector((store) => store.messagesReducer);
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState('')

  const getMessages = () => {
    console.log('params', params.id)
    dispatch({
      type: 'GET_MESSAGES',
      payload: params.id
    })
  }

  const sendMessage = (event) => {
    //make a separate route for this!!!!
    event.preventDefault();


    dispatch({
      type: 'SEND_RESPONSE',
      payload: {
        message: newMessage,
        albumId: messages[0].album_id,
        //id of previous recipient
        prevRecipientId: messages[0].recipient_user_id,
        //id of previous sender
        prevSenderId: messages[0].sender_user_id,
        code: messages[0].code
      }
    })
    setNewMessage('');
  }

  useEffect(() => {
    getMessages();
  }, []);

  const formatDate = (date) => {
    // let formattedDate = new Date(date).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    let formattedDate = new Date(date).toLocaleString('en-us', { timeZone: 'CST' });
    console.log('formatted date', formattedDate)
    return formattedDate;
  }



  return (
    <div className="messagePageContainer">
      <h2>Your message thread about:</h2>
      <div className="messagesArtist-Album-Image">
        <img src={messages[0] && messages[0].album_art} className="messageImage" />
        <div className="artist-title-vert">
          <div></div>
          <div className="messagesArtist-Album">
            <div className="artistNameMargin">{messages[0] && messages[0].artist_name}</div>
            <div>{messages[0] && messages[0].title}</div>
          </div>
          <div></div>
        </div>
      </div>

      {/* {JSON.stringify(messages)} */}
      <form onSubmit={sendMessage}>
        <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
          size="small" style={{ width: 700 }} multiline rows={4} sx={{ backgroundColor: 'white', mb: 2 }} placeholder="artist name or album title" value={newMessage} />
        <br />
        <div className="messageBtnDiv">
          <Button variant="contained" sx={{ ...styles1, mr: 1, mb: 4 }} type="submit" >Send</Button>
          <Button onClick={() => setNewMessage('')} variant="contained" sx={{ ...styles1, ml: 1, mb: 4 }}>Clear</Button>
        </div>
      </form>
      {messages.map((message) => {
        return (
          <>
            <div className={`messageDiv ${user.id === message.sender_user_id ? "leftAlign" : "rightAlign"}`}>
              <div className="messageHeader">
                {message.sender}:
                <br />
                {formatDate(message.time_stamp)}
              </div>


              <div >

                <div className="messageDetails">
                  {/* <p>Sender: {message.sender}</p> */}
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  );
}

export default Messages;
