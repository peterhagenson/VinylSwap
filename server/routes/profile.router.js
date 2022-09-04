const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.put('/', (req, res) => {
    console.log('in profile router', req.body, req.user.id);
    const query = `UPDATE "user"
    SET city = $1,
    state = $2,
    bio = $3,
    email = $4
    WHERE "user".id = $5;
    `;
    pool.query(query, [req.body.city, req.body.state, req.body.bio, req.body.email, req.user.id])
})

module.exports = router;