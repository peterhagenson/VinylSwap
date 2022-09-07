const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//---------------------------------------------------
// TODO: Rename this router to inventory.router.js
//---------------------------------------------------



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
  let name_title = req.body.title;
  let breakup = name_title.split(' - ');
  let artist_name = breakup[0];
  let title = breakup[1];
  console.log('test: ', artist_name);
  console.log('test2: ', title)
  console.log(name_title);
  const query = `INSERT INTO "album" (user_id, title, published_date, record_label, album_art, country, genre, barcode, discogs_id, artist_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool.query(query, [req.user.id, title, req.body.year, req.body.label[0], req.body.cover_image, req.body.country, req.body.genre, req.body.barcode, req.body.id, artist_name])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

// manages deleting inventory items
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

router.put('/', (req, res) => {
  console.log('in router put', req.body)
  let trueVar = true;
  query = `UPDATE "album"
  SET condition = $1, user_description = $2, is_active = 'true'
  WHERE "album".discogs_id = $3;`;
  pool.query(query, [req.body.condition, req.body.description, req.body.discogsID])
})



module.exports = router;
