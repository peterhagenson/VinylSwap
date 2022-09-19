const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.put('/', rejectUnauthenticated, (req, res) => {
  // parameters from req.body get pushed into queryParams if they were entered into text field by user.
  let queryParams = [];
  // startString will always be the same, the rest of the string variables are empty by default, but become sections of the query if they exist.
  const startString = 'UPDATE "user" SET';
  let endString = '';
  let cityString = '';
  let stateString = '';
  let bioString = '';
  let emailString = '';
  let count = 1;

  // if req.body.city exists and one of the other parameters also exist, push req.body.city to queryParams array, reassign cityString variable to the shown string WITH A COMMA, and add 1 to count
  if (req.body.city.length && (req.body.state.length || req.body.bio.length || req.body.email.length)) {
    queryParams.push(req.body.city);
    cityString = `city = $${count},`;
    count++;
    // if req.body.city exists and one of the other parameters also exist, push req.body.city to queryParams array, reassign cityString variable to the shown string WITHOUT A COMMA, and add 1 to count
  } else if (req.body.city.length) {
    queryParams.push(req.body.city);
    cityString = `city = $${count}`;
    count++;
  }

  if (req.body.state.length && (req.body.bio.length || req.body.email.length)) {
    queryParams.push(req.body.state);
    stateString = `state = $${count},`
    count++;
  } else if (req.body.state.length) {
    queryParams.push(req.body.state);
    stateString = `state = $${count}`
    count++;
  }
  if (req.body.bio.length && req.body.email.length) {
    queryParams.push(req.body.bio);
    bioString = `bio = $${count},`
    count++;
  } else if (req.body.bio.length) {
    queryParams.push(req.body.bio);
    bioString = `bio = $${count}`
    count++;
  }
  if (req.body.email.length) {
    queryParams.push(req.body.email);
    emailString = `email = $${count}`
    count++;

  }
  //after all of the 'SET' parameters have been added, complete querystring with the WHERE statement
  endString = `WHERE "user".id = $${count}`;
  queryParams.push(req.user.id)


  let query = `${startString} ${cityString} ${stateString} ${bioString} ${emailString} ${endString}`;

  // console.log(query, queryParams);
  pool.query(query, queryParams)
    .then(result => {
      console.log("update success");
      res.sendStatus(201)
    }).catch(err => {
      console.log('ERROR IN UPDATE', err);
      res.sendStatus(500)
    })
  // pool.query(query, [req.body.city, req.body.state, req.body.bio, req.body.email, req.user.id])
})

router.get('/', rejectUnauthenticated, (req, res) => {
  //    console.log("in router get", req.user)
  const query = `SELECT * FROM "user" WHERE "user".id = $1;`;
  pool.query(query, [req.user.id])
    .then(result => {
      // console.log(result.rows);
      let user = result.rows;
      const query2 = `Select * FROM "album" WHERE "album".user_id = $1;`;
      pool.query(query2, [req.user.id])
        .then(result => {
          // console.log(result.rows)
          let inventory = result.rows;
          let userProfile = {
            user: user[0],
            inventory: inventory
          }
          // console.log(userProfile);
          res.send(userProfile)
        })
    })
});

module.exports = router;