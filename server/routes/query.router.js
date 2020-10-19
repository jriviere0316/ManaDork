// const express = require('express');
// const pool = require('../modules/pool');
// const axios = require('axios');
// require('dotenv').config();

// const router = express.Router();

// router.get('/:tacos', (req, res) => {
//     //res.send('Hello World'); // Replace this
//     axios({
//       method: 'GET',
//       url: `https://api.scryfall.com/cards/search?q=${req.params.tacos}`,
//       //limit: 20,
    
//     }).then(response => {
//         console.log('got back data', response.data);
//         res.send(response.data);
//       }).catch(err => {
//         console.error(err);
    
//         res.sendStatus(500);
//       });
//     });
    

// module.exports = router;