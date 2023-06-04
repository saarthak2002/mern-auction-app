const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    startingBid:{
        type: Number,
        required: true
    },
    sold:{
        type: Boolean,
        required: true
    },
    image: {
        type: String
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    auctionEndDate: {
        type: Date,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);