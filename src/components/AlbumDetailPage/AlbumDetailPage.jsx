import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom'




function TemplateFunction() {

  const params = useParams();
  const dispatch = useDispatch();

  // const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');

  const getDetail = () => {
    console.log("in getDetail", params.id)
    dispatch({
      type: 'GET_DETAILS',
      payload: params.id
    })
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (

    <div>
      <h2>test</h2>
    </div>
  );
}

export default TemplateFunction;
