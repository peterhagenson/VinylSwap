import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TemplateFunction() {

  const params = useParams();

  const dispatch = useDispatch();






  const trader = useSelector((store) => store.traderReducer);
  const [heading, setHeading] = useState('Functional Component');

  const getTrader = () => {
    // console.log(params.id);
    dispatch({
      type: "GET_TRADER",
      payload: params.id
    });
  }


  useEffect(() => {
    getTrader();

  }, []);

  if (trader) {
    return (


      <div>
        <p>{trader.albums && trader.albums[0].title}</p>
        <br />
        {/* {trader && trader.profile.username}
            <h2>{JSON.stringify(trader)}</h2> */}

      </div>

    );
  }
}

export default TemplateFunction;
