const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // console.log("in details.router, req.params:", req.params)
  const query = `SELECT "album".*, "user".username, "user".city, "user".state, "user".email, "user".join_date, "user".bio FROM "user" JOIN "album" ON "user".id = "album".user_id WHERE "album".id = $1;`;

  pool.query(query, [req.params.id])
    .then(result => {
      // console.log("query1 result", result.rows);
      res.send(result.rows);
    }).catch(err => {
      console.log("Get details failed", err);
      res.sendStatus(500);
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
