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
    const query = `SELECT * FROM "card_item" ORDER BY name ASC ;`
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
    

router.delete('/:id', (req, res) => {
    console.log( 'in delete list item router:', req.body.id)
    const query = `DELETE FROM "card_item" WHERE "id"=$1;`
    pool.query(query, [req.body.id])
    .then(() => 
        res.sendStatus(200))
    .catch(error => {
        console.log('ERROR:', error);
    })
});
 

router.put('/:id',(req, res) => {
    console.log( 'in edit list item router:', req.body)
    const query = `
    UPDATE "card_item" 
    SET 
    "name" = $1,
    "quantity" = $2,
    "is_cmdr" = $3,
    "is_featured" = $4,
    "api_data" = $5,
    "deckid" = $6,
    "comboid" = $7
    WHERE "id" = $8 
    ;`
    pool.query(query, [req.body.name, req.body.quantity, req.body.is_cmdr, req.body.is_featured, req.body.api_data, req.body.deckid, req.body.comboid, req.body.id])
    .then(() => 
        res.sendStatus(200))
    .catch(error => {
        console.log('ERROR:', error);
    })
});
module.exports = router;