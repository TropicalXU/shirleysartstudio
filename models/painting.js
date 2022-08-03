/* CREATING THE PAINTINGS MODEL*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//     url: String,
//     filename: String

// });

const opts = { toJSON: { virtuals: true } };

const PaintingSchema = new Schema({
    
    isAvailable: Boolean,
    type: String,
    author: String,
    title: String,
    image: String,
    img: String,
    description: String,
    price: Number,
    qty: Number,
    stripe_link: String,
    artist: String

},opts);

module.exports = mongoose.model('Painting', PaintingSchema);

