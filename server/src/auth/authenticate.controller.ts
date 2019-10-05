import express = require('express');

const router = express.Router();

// routes
router.post('/', (req, res, next) => {
    console.log('authenticate request');
    
});

export default router;



