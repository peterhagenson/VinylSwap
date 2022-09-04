const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/:term', (req, res) => {
  console.log("in api router", req.params)
  axios.get(`https://api.discogs.com/database/search?q=${req.params.term}&key=${process.env.DISCOGS_CONSUMER_KEY}&secret=${process.env.DISCOGS_CONSUMER_SECRET}`)
  .then(response => {
      console.log(response.data)
      res.send(response.data)
  }).catch(err => {
    console.log('ERROR IN get API', err);
    res.sendStatus(500)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
