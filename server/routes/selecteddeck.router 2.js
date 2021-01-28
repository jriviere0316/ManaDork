const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
//selected deck route
router.get('/:id', (req, res) => {
    console.log('in selected deck get route with', req.params.id);
    console.log('req.user:', req.user);
    // let queryText, queryParams;
    // if (req.user.clearance === 1){
    // }
    const query = `SELECT * FROM deck WHERE "id" = $1;`
    const queryParams = [req.params.id]
    pool.query(query, queryParams)
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR',error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
