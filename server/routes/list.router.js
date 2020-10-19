const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res, next) => {//LEFT OFF HERE*********** req.body.userid needs to be added to DB
    console.log('******in list item POST with req.body:', req.body);
    const queryText = `INSERT INTO "card_item" ( "name", "quantity", "is_cmdr", "is_featured", "api_data", "deckid", "comboid")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool
        .query(queryText, [req.body.name, req.body.quantity, req.body.is_cmdr, req.body.is_featured, req.body.api_data, req.body.deckid, req.body.comboid ])

    //  .query(queryText, [req.user.id, req.body.deckname, req.body.ispublic, req.body.description, req.body.decklist, req.body.featured_card, req.body.upvotes, req.body.comments ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);

    })
      
});

router.get('/',  (req, res) => {
    console.log('req.user:', req.user);
    console.log( 'in list GET with req.body:', req)
    const query = `SELECT * FROM "card_item"  ;`
    // const queryParams = [req.body.deckid]
    
    
    pool.query(query)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});
    

// router.delete('/:id', (req, res) => {
//     console.log( 'in delete router:', req.params.id)
//     const query = `DELETE FROM "deck" WHERE "id"=$1;`
//     pool.query(query, [req.params.id])
//     .then(() => 
//         res.sendStatus(200))
//     .catch(error => {
//         console.log('ERROR:', error);
//     })
// });

module.exports = router;