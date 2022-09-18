import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Threads(props) {

  const dispatch = useDispatch();

  const history = useHistory();

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

  const toThread = (code) => {
    console.log("in thread", code)
    history.push(`/messages/${code}`);
  }

  const formatDate = (date) => {
    // let formattedDate = new Date(date).toLocaleString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    let formattedDate = new Date(date).toLocaleString('en-us', { timeZone: 'CST' });
    console.log('formatted date', formattedDate)
    return formattedDate;

  }

  return (
    <div className="threadsPageContainer">
      {/* {JSON.stringify(threads)} */}
      <br />
      <h3>Your Message Threads:</h3>
      {threads && threads.map((thread) => {

        return (
          <>

            <div onClick={() => toThread(thread.code)} className="threadCard">
              <div className="threadImageContainer">
                <div></div>
                <img className="threadImage" src={thread.album_art} />
                <div></div>
              </div>
              <div className="threadArtistAlbumContainer">
                <div></div>
                <div>
                  <p className="bold">Album:</p>
                  <p>{thread.artist_name}</p>
                  <p>{thread.title}</p>
                </div>
                <div></div>
              </div>
              <div className="mostRecentMessage">
                <div className="threadSpacerDiv"></div>
                <div>
                  <p className="bold">Most Recent Message:</p>
                  <p>{formatDate(thread.max)}</p>
                </div>
                <div className="threadSpacerDiv"></div>
              </div>
            </div>




          </>
        )
      })}
    </div>
  );
}

// map through the message.code and display the thread "name" -> maybe by album name!\?!
//Click on thread "name" -> go to /message/code, this would also send a dispatch to the redux saga to get all messages for that thread
// In a new component, map through all of your messages, and display each!

{/* <form onSubmit={() => sendMessage(message)}>
              <TextField onChange={(event) => (setNewMessage(event.target.value))} variant="outlined"
                size="small" style={{ width: 300 }} multiline rows={4} sx={{ backgroundColor: 'white' }} placeholder="artist name or album title" value={newMessage} />
              <Button variant="contained" sx={{ color: 'white', backgroundColor: 'black', mt: 2, mr: 1 }} type="submit" >Send</Button>
            </form> */}

export default Threads;
