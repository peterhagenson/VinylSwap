const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // console.log("in details.router, req.params:", req.params)
  const query = `SELECT * FROM "album" WHERE "album".id = $1;`;
  pool.query(query, [req.params.id])
  .then(result => {
    // console.log("query1 result", result.rows);
    let album = result.rows;
    let userId = result.rows[0].user_id;
    // console.log("album and user id:", album, userId)
    const query2 = 'SELECT * FROM "user" WHERE "id" = $1;';
    pool.query(query2, [userId]) 
    .then(result => {
      let user = result.rows;
      // console.log("album and user", album, user)
      let detailsPackage = {
        album: album,
        user: user
      };
      res.send(detailsPackage);
    }).catch(err => {
      console.log("Get details failed", err);
      res.sendStatus(500);
    })
   })
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
