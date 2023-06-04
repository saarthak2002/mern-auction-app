const express = require('express');
const router = express.Router();

const Item = require('../../models/Item.js');

router.get('/', (request, result) => {
    Item.find()
        .then(items => result.json(items))
        .catch(err => result.status(404).json({ noitemsfound: 'No Items found' }));
});

router.get('/:id', (request, result) => {
    Item.findById(request.params.id)
        .then(item => result.json(item))
        .catch(err => result.status(404).json({ noitemsfound: 'No Items found' }));
})

router.post('/', (request, result) => {
    Item.create(request.body)
        .then(item => result.json({message: 'Item added successfully'}))
        .catch(error => result.status(400).json({ error: 'Unable to add this item' }));
});

module.exports = router;