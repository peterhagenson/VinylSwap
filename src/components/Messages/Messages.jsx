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



  return (
    <div>
      <h2>Messages</h2>
      {/* {JSON.stringify(messages)} */}
      <form onSubmit={sendMessage}>
        <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
          size="small" style={{ width: 300 }} multiline rows={4} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={newMessage} />
        <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', mt: 2, mr: 1 }} type="submit" >Send</Button>
      </form>
      {messages.map((message) => {
        return (
          <>
            <div className="messageDiv">
              <p>Sender: {message.sender}</p>
              <p>{message.message} </p>
            </div>
          </>
        )
      })}
    </div>
  );
}

export default Messages;
