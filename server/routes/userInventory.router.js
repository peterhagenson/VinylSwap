const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//---------------------------------------------------
// TODO: Delete this router 
//---------------------------------------------------



/**
 * GET route template
 */
// router.get('/', (req, res) => {
//   // console.log("in userInventory GET router", req.user)
//   const query = `SELECT * FROM "album" WHERE "album".user_id = $1;`;
//   pool.query(query, [req.user.id])
//   .then(result => {
//     console.log(result.rows)
//     res.send(result.rows)
//   })
// });

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });
//
//module.exports = router;
