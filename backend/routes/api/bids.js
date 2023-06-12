const express = require('express');
const router = express.Router();

const Bid = require('../../models/Bid.js');

router.get('/', (request, result) => {
    Bid.find()
        .then(bids => result.json(bids))
        .catch(err => result.status(404).json({ nobidsfound: 'No Bids found' }));
});

router.get('/:item_id', (request, result) => {
    Bid.find({ item: request.params.item_id })
        .then(bids => result.json(bids))
        .catch(err => result.status(404).json({ nobidsfound: 'No Bids found' }));
});

router.get('/user/:user_id', (request, result) => {
    Bid.find({ buyer: request.params.user_id })
        .then(bids => result.json(bids))
        .catch(err => result.status(404).json({ nobidsfound: 'No Bids found' }));
})

router.post('/', (request, result) => {
    Bid.create(request.body)
        .then(bid => result.json({message: 'Bid added successfully'}))
        .catch(error => result.status(400).json({ error: 'Unable to add this bid' }));
});

module.exports = router;