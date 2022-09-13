import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Threads(props) {

  const dispatch = useDispatch();

  const threads = useSelector((store) => store.threads)
  const [newMessage, setNewMessage] = useState('');


  const getThreads = () => {
    dispatch({
      type: 'GET_THREADS',
    })
  }

  useEffect(() => {
    getThreads();
  }, []);

  const sendMessage = (message) => {
    console.log('in new message', newMessage);
    dispatch({
      type: 'SEND_MESSAGE',
      payload: {
        message: newMessage,
        code: message.code,
        recipientId: message.sender_user_id,
        albumId: message.album_id

      }

    })
  }


  return (
    <div>
      {JSON.stringify(threads)}


      {threads && threads.map((thread) => {
        // map through the message.code and display the thread "name" -> maybe by album name!\?!
        //Click on thread "name" -> go to /message/code, this would also send a dispatch to the redux saga to get all messages for that thread
        // In a new component, map through all of your messages, and display each!
        return (
          <>
            <p>{thread.message}</p>
            <form onSubmit={() => sendMessage(message)}>
              <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
                size="small" style={{ width: 300 }} multiline rows={4} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={newMessage} />
              <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', mt: 2, mr: 1 }} type="submit" >Send</Button>
            </form>
          </>
        )
      })}
    </div>
  );
}

export default Threads;
