import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



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
      <h2>Messages</h2>
      {/* {JSON.stringify(messages)} */}
      <form onSubmit={sendMessage}>
        <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
          size="small" style={{ width: 700 }} multiline rows={4} sx={{ backgroundColor: 'white', mb: 2 }} placeholder="artist name or album title" value={newMessage} />
        <br />
        <div className="messageBtnDiv">
          <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', mr: 1, mb: 4 }} type="submit" >Send</Button>
          <Button onClick={() => setSearchTerm('')} variant="contained" sx={{ color: 'white', backgroundColor: 'black', ml: 1, mb: 4 }}>Clear</Button>
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
