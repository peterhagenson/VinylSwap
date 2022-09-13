import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Messages(props) {

  const dispatch = useDispatch();

  const messages = useSelector((store) => store.messages)
  // const [newMessage, setNewMessage] = useEffect('');


  const getMessages = () => {
    dispatch({
      type: 'GET_MESSAGES',
    })
  }

  useEffect(() => {
    getMessages();
  }, []);

  // const sendMessage = () => {

  // }


  return (
    <div>
      {JSON.stringify(messages)}
      {messages.map((message) => {
        return (
          <p>{message.message}</p>
        )
      })}

      {/* <form onSubmit={() => sendMessage()}>
        <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
          size="small" style={{ width: 300 }} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={newMessage} />
        <br />
        <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', mt: 2, mr: 1 }} type="submit" >Find</Button>
      </form> */}

    </div>
  );
}

export default Messages;
