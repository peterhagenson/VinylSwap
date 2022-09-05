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

  const details = useSelector((store) => store.albumDetails);
  // const [heading, setHeading] = useState('Functional Component');




  const getDetail = () => {
    console.log("in getDetail", params.id)
    dispatch({
      type: 'GET_DETAILS',
      payload: params.id
    })
    dispatch({
      type: 'GET_OWNER',
      payload: params.id
    })
  }




  return (
    <Router>
      <Route path="/detail/:id">

        <div>
          {/* {details && (details.album[0].title)} */}
          {JSON.stringify(details)}
          {params.id}
          {details.title}
          <img src={details.album_art} />


        </div>
      </Route>
    </Router>
  );
}


export default AlbumDetails;
