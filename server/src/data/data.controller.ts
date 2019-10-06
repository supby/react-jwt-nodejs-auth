import express = require('express');

const router = express.Router();

const data = [{id: 1, name: 'name1', value: 'value1'}, {id: 2, name: 'name2', value: 'value2'}];

// routes
router.get('/', (req, res, next) => {
    res.json(data);
});

router.get('/:id', (req, res, next) => {
    res.json(data.find((d) => d.id === Number(req.params.id)));
});

export default router;



