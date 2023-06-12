const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = Bid = mongoose.model('bid', BidSchema);