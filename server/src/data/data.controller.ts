import express = require('express');

const router = express.Router();

// routes
router.get('/', (req, res, next) => {
    console.log('data get all');
});

router.get('/:id', (req, res, next) => {
    console.log('data get one by Id');
});

export default router;



