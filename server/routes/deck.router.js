const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.post('/', (req, res, next) => {//LEFT OFF HERE***********
    console.log('in deck POST with req.body:', req.body);
    const queryText = `INSERT INTO "deck" ("userid", "deckname", "ispublic", "description", "decklist", "featured_card", "upvotes", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool
      .query(queryText, [req.body.userid, req.body.txt, req.body.ispublic, req.body.description, req.body.decklist, req.body.featured_card, req.body.upvotes, req.body.comments ])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });
    

module.exports = router;