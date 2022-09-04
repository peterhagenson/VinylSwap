const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.put('/', (req, res) => {
    console.log('in profile router', req.body, req.user.id);
    const query = `UPDATE "user"
    SET city = $1,
    state = $2,
    bio = $3,
    email = $4
    WHERE "user".id = $5;
    `;
    pool.query(query, [req.body.city, req.body.state, req.body.bio, req.body.email, req.user.id])
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
    .then (result => {
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