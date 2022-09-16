const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in get threads router')


  let query = `SELECT "thread".code, "thread".album_id, "album".title, "album".artist_name, "album".album_art, MAX("thread".time_stamp) FROM "thread" 
  JOIN "album"
  ON "thread".album_id = "album".id
  WHERE recipient_user_id = $1 OR sender_user_id = $1 
  GROUP BY "thread".code, "thread".album_id , "album".title, "album".album_art, "album".artist_name ORDER BY max DESC;`;

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


module.exports = router;
