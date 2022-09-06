import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TemplateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <Router>
      <Route path="/traderPage/:id">


        <div>
          <h2>{heading}</h2>
        </div>
      </Route>
    </Router>
  );
}

export default TemplateFunction;
