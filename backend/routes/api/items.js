const express = require('express');
const router = express.Router();

const Item = require('../../models/Item.js');

router.get('/', (request, result) => {
    Item.find()
        .then(items => result.json(items))
        .catch(err => result.status(404).json({ noitemsfound: 'No Items found' }));
});

module.exports = router;