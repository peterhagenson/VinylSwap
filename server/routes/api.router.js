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
  console.log('in router POST', req.body, req.user)
  const query = `INSERT INTO "album" (user_id, title, published_date, record_label, album_art) VALUES ($1, $2, $3, $4, $5);`;
  pool.query(query, [req.user.id, req.body.title, req.body.year, req.body.label[0], req.body.cover_image])
  .then(result => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
});

router.delete('/:id', (req, res) => {
  console.log('in router delete', req.params)
  const query = `DELETE FROM "album" WHERE id = $1;`;
  pool.query(query, [req.params.id])
  .then(response => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;
