const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/',  (req, res) => {
    console.log( 'in FRIENDS GET with req.body:', req)
    const query = `SELECT * FROM "user" ORDER BY username ASC; ;`
    
    
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});
    

module.exports = router;