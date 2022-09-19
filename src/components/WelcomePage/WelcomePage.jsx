import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
// import background from "..../images/record-collection.jpg"
import Button from '@mui/material/Button';


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
function TemplateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  const history = useHistory();

  const toSearch = () => {
    history.push("/search")
  }

  const toAddInventory = () => {
    history.push('/addInventory')
  }


  return (
    <>
      <div className="welcomePageDiv">
        <div></div>

        <div className="welcomeBackground" style={{
          backgroundImage: "url(../images/record-collection.jpg)",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          // marginLeft: 165,
          // marginRight: 150,
          maxWidth: 950,

        }}>
          <div className="welcomeBoxAlign">
            <div></div>
            <div className="welcomeBox">
              <h3>What are you here to do?</h3>
              <Button variant="contained" sx={{ ...styles1, mt: 2, mr: 2, width: '98px' }} onClick={toSearch} >Find Albums</Button>
              <Button variant="contained" sx={{ ...styles1, mt: 2, ml: 2, width: '98px' }} onClick={toAddInventory}>Upload Albums</Button>

            </div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default TemplateFunction;
