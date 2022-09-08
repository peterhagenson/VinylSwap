const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.put('/', (req, res) => {
  console.log('in profile router', req.body, req.user.id);
  // set query to empty string

  // const query = `UPDATE "user" SET 
  // city = $1,
  // state = $2,
  // bio = $3,
  // email = $4
  // WHERE "user".id = $5;
  // `;

  let queryParams = []
  const startString = 'UPDATE "user" SET';
  let endString = '';
  let cityString = '';
  let stateString = '';
  let bioString = '';
  let emailString = '';
  let count = 1;

  cityString = req.body.city;
  if (req.body.city.length && (req.body.state.length || req.body.bio.length || req.body.email.length)) {
    queryParams.push(req.body.city);
    cityString = `city = $${count},`;
    count++;
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
  endString = `WHERE "user".id = $${count}`;
  queryParams.push(req.user.id)


  let query = `${startString} ${cityString} ${stateString} ${bioString} ${emailString} ${endString}`;

  console.log(query, queryParams);
  pool.query(query, queryParams);

  // pool.query(query, [req.body.city, req.body.state, req.body.bio, req.body.email, req.user.id])
})

router.get('/', (req, res) => {
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
          console.log(userProfile);
          res.send(userProfile)
        })
    })
});

module.exports = router;