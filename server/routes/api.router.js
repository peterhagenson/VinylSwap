const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//---------------------------------------------------
// TODO: Rename this router to inventory.router.js
//---------------------------------------------------



/**
 * GET route template
 */
router.get('/:term', rejectUnauthenticated, (req, res) => {
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
router.post('/', rejectUnauthenticated, (req, res) => {
  // console.log('in router POST', req.body, req.user)
  let name_title = req.body.title;
  let breakup = name_title.split(' - ');
  let artist_name = breakup[0];
  let title = breakup[1];
  // let genre = req.body.genre;

  // console.log(genre.toString());
  // console.log('test: ', artist_name);
  // console.log('test2: ', title)
  // console.log(name_title);
  const query = `INSERT INTO "album" (user_id, title, published_date, record_label, album_art, country, genre, barcode, discogs_id, artist_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool.query(query, [req.user.id, title, req.body.year, req.body.label[0], req.body.cover_image, req.body.country, req.body.genre.toString(), req.body.barcode, req.body.id, artist_name])
    .then(result => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});

// manages deleting inventory items
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // console.log('in router delete', req.params)
  const query = `DELETE FROM "album" WHERE id = $1;`;
  pool.query(query, [req.params.id])
    .then(response => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  // console.log('in router put', req.body)
  let queryParams = [];
  const startString = 'UPDATE "album" SET';
  let conditionString = '';
  let descriptionString = '';
  let activeString = "is_active = 'true'";
  let count = 1;

  if (req.body.condition.length) {
    queryParams.push(req.body.condition);
    conditionString = `condition = $${count},`;
    count++;
    // } else if (req.body.condition.length) {
    //   queryParams.push(req.body.condition);
    //   conditionString = `condition = $${1}`;
    //   count++;
  }
  if (req.body.description.length) {
    queryParams.push(req.body.description);
    descriptionString = `user_description = $${count},`;
    count++;
  }

  endString = `WHERE discogs_id = $${count}`;
  queryParams.push(req.body.discogsID);


  let query = `${startString} ${conditionString} ${descriptionString} ${activeString} ${endString}`;

  // query = `UPDATE "album"
  // SET condition = $1, user_description = $2, is_active = 'true'
  // WHERE "album".discogs_id = $3; `;
  console.log('chect query and params', query, queryParams)
  pool.query(query, queryParams)
    // [req.body.condition, req.body.description, req.body.discogsID]
    .then(result => {
      // console.log("update success");
      res.sendStatus(201)
    }).catch(err => {
      console.log('ERROR IN UPDATE', err);
      res.sendStatus(500)
    })
})




module.exports = router;
