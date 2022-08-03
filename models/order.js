//NOT IN USE - WILL USE FOR FUTURE IMPLEMENTATION
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        paintings: [
            {
                paintingId: {
                    type: String,
                },
                qty: {
                    type: Number,
                    default: 1,
                }
            }
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: 'pending'},

    },{timestamps: true})

module.exports = mongoose.model('Order', OrderSchema);