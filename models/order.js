//After making payment the details will be stored via this model
//We need to store which order is done by which user

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    txnid: {
        type: String,
    },
    amount: {
        type: Number,
    },
    productInfo: {
        type: String
    },
    orderedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, {timestamps: true});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;  