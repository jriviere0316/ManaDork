const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { Router } = require('express');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res, next) => {//LEFT OFF HERE*********** req.body.userid needs to be added to DB
    console.log('in deck POST with req.body:', req.body);
    const queryText = `INSERT INTO "deck" 
    ("userid", "deckname", "ispublic", "description", "decklist", "featured_card", "upvotes", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool
      .query(queryText, [req.user.id, req.body.deckname, req.body.ispublic, req.body.description, req.body.decklist, req.body.featured_card, req.body.upvotes, req.body.comments ])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('err:', err);
        res.sendStatus(500);

    })
      
});

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    console.log( 'in shelf GET')

    // let queryText, queryParams;
    // if (req.user.clearance === 1){
        
    // }
    const query = `SELECT * FROM deck WHERE "userid" = $1;`
    const queryParams = [req.user.id]
    
    
    pool.query(query, queryParams)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});
    

router.delete('/:id', (req, res) => {
    console.log( 'in delete router:', req.params.id)
    const query = `DELETE FROM "deck" WHERE "id"=$1;`
    pool.query(query, [req.params.id])
    .then(() => 
        res.sendStatus(200))
    .catch(error => {
        console.log('ERROR:', error);
    })
});

router.put('/:id', (req, res) => {
    console.log('in edit router with:', req.body);
    const query = `
    UPDATE "deck"
    SET 

    "comments" = $1,
    "decklist" = $2,
    "deckname" = $3,
    "description"= $4,
    "featured_card" = $5,
    "ispublic" = $6,
    "userid" = $7
    WHERE "id" = $8
    ;`;
    pool.query(query, [req.body.comments, 
        req.body.decklist, req.body.deckname, req.body.description, req.body.featured_card, 
        req.body.ispublic, req.body.userid, req.body.id])
    .then(() => 
    res.sendStatus(200))
    .catch(error => {
      console.log('ERROR:', error);
    })
  });

module.exports = router;