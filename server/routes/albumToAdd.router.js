const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in get album to add', req.params, req.params.id)
    const query = `SELECT * FROM "album" WHERE discogs_id = $1;`;
    pool.query(query, [req.params.id])
        .then(result => {
            // console.log('result ', result.rows)
            res.send(result.rows)
        }).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router;