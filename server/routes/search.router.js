const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const axios = require('axios');

/**
 * GET route template
 */
router.get('/:searchTerm', (req, res) => {
  //query pulls all albums from db
  const query = 'SELECT "album".* FROM "album" JOIN "user" ON "album".user_id = "user".id;';

  //const query = `SELECT * FROM "album" WHERE "album".id = 3;`;
  pool.query(query).then(result => {
   
    //function loops through albums and finds those whose title contains the searchTerm. Then adds the matches to searchResults and sends searchResults to search.saga.js

    //TODO get user info 
    console.log(result);

    let searchResults = [];
    for (result of result.rows) {
      if (result.title.includes(req.params.searchTerm)) {
        console.log(result);
        searchResults.push(result)
      }
    }
    // console.log(searchResults);
    res.send(searchResults);
    searchResults = [];
  }).catch(err => {
    res.sendStatus(500)
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
