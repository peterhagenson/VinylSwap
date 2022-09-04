const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/:searchTerm', (req, res) => {
  //query pulls all albums from db
  const query = 'SELECT * FROM "album";';
  pool.query(query).then(result => {
   
    //function loops through albums and finds those whose title contains the searchTerm. Then adds the matches to searchResults and sends searchResults to client
    let searchResults = [];
    for (result of result.rows) {
      if (result.title.includes(req.params.searchTerm)) {
        // console.log(result);
        searchResults.push(result)
      }
    }
    console.log(searchResults);
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
