const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // console.log("in trader get route", req.params)
  const query = `SELECT "user".*, array_agg("album") FROM "user"
  JOIN "album"
  ON "user".id = "album".user_id
  WHERE "user".id = $1
  GROUP BY "user".id;`;
  pool.query(query, [req.params.id])
  .then(result => {
    console.log(result.rows[0].array_agg)
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
