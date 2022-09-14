const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('in get messages router')
  // let query = `SELECT * FROM "thread"
  // WHERE recipient_user_id = $1 OR sender_user_id = $1
  // ORDER BY album_id, time_stamp DESC;`;

  let query = `SELECT "thread".code, "thread".album_id, "album".title, "album".artist_name, "album".album_art, MAX("thread".time_stamp) FROM "thread" 
  JOIN "album"
  ON "thread".album_id = "album".id
  WHERE recipient_user_id = $1 OR sender_user_id = $1 
  GROUP BY "thread".code, "thread".album_id , "album".title, "album".album_art, "album".artist_name ORDER BY max DESC;`;


  // `SELECT code, album_id,  MAX(time_stamp) FROM "thread" 
  // WHERE recipient_user_id = $1 OR sender_user_id = $1 
  // GROUP BY code, album_id ORDER BY max ASC;`;

  pool.query(query, [req.user.id])
    .then(result => {
      console.log("result", result.rows)
      res.send(result.rows)
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })




  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('in message post')
  console.log(req.user.id)
  console.log(req.body)
  let query = `INSERT INTO "thread" (sender_user_id, recipient_user_id, album_id, message, code)
  VALUES ($1, $2, $3, $4, $5);`;
  pool.query(query, [req.user.id, req.body.recipientId, req.body.albumId, req.body.message, req.body.code])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })

  // POST route code here
});

module.exports = router;
