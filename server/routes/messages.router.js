const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:code', rejectUnauthenticated, (req, res) => {
  console.log(req.params);
  // let query = `SELECT "thread".*, "user".username as sender FROM "thread"
  // JOIN "user"
  // ON "user".id = "thread".sender_user_id 
  // WHERE code = $1 ORDER BY time_stamp DESC;`;
  let query = `SELECT "thread".*, "album".album_art, "album".artist_name, "album".title, "user".username as sender FROM "thread"
  JOIN "user"
  ON "user".id = "thread".sender_user_id 
  JOIN "album" ON "album".id = "thread".album_id
  WHERE code = $1 ORDER BY time_stamp DESC;`
  pool.query(query, [req.params.code])
    .then(result => {
      // console.log(result.rows)
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
router.post('/', rejectUnauthenticated, (req, res) => {
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

router.post('/response', rejectUnauthenticated, (req, res) => {
  console.log('in message response')
  //DONT DO THIS JUST MAKE A ROUTE
  // if req.user.id is same as req.body.sender_user_id (from last message), then recipient_user_id will be recipient_user_id, else if req.user.id is not same as req.body.sender_user_id, then sender_user_id will be req.body.recipient_user_id and recipient_user_id will be req.body.sender_user_id
  console.log(req.user.id)
  console.log(req.body)
  let sender_user_id;
  let recipient_user_id;
  if (req.user.id === req.body.prevSenderId) {
    sender_user_id = req.user.id;
    recipient_user_id = req.body.prevRecipientId;
  } else if (req.user.id !== req.body.prevSenderId) {
    sender_user_id = req.body.prevRecipientId;
    recipient_user_id = req.body.prevSenderId;
  }
  let query = `INSERT INTO "thread" (sender_user_id, recipient_user_id, album_id, message, code)
  VALUES ($1, $2, $3, $4, $5);`;
  pool.query(query, [sender_user_id, recipient_user_id, req.body.albumId, req.body.message, req.body.code])
    .then(response => {
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});



// POST route code here

module.exports = router;
