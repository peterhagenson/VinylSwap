import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function TemplateFunction(props) {

  const dispatch = useDispatch();

  const messages = useSelector((store) => store.messages)


  const getMessages = () => {
    dispatch({
      type: 'GET_MESSAGES',
    })
  }

  useEffect(() => {
    getMessages();
  }, []);


  return (
    <div>
      {/* <h2>{heading}</h2> */}
      {JSON.stringify(messages)}
      {/* {messages.map((thread) => {
        if (thread) { */}

      {/* }
      })} */}
    </div>
  );
}

export default TemplateFunction;
