if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Painting = require('../models/painting');
const paintings = require('../seeds/paintings');
const dbUrl = process.env.DB_URL;
/* CONNECTING WITH OUR MONGO DATABASE*/

mongoose.connect(dbUrl, {
  useNewUrlParser: true,

  useUnifiedTopology: true,

   
});

/* ENSURING DATABASE IS CONNECTED*/
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
console.log('Database connected')
});

/*SEEDING THE DATABASE WITH THE PAINTINGS DATA ACCESSING FROM THE PAINTINGS.JS/SEEDS FILE*/
const seedDB = async() => {
   
   for(let i = 0; i < 100; i ++) { /* looping over each painting to populate each one in the database*/
    const painting = new Painting({
        isAvailable: `${paintings[i].isAvailable}`,
        type: `${paintings[i].type}`,
        author: '62abdf27401ab4ff53f68e90',
        title: `${paintings[i].title}`,
        image: `${paintings[i].image}`,
        img: `${paintings[i].img}`,
        description: `${paintings[i].description}`,
        stripe_link: `${paintings[i].stripe_link}`,
        price: `${paintings[i].price}`,
        qty: `${paintings[i].qty}`,
        artist: `${paintings[i].artist}`
   })
    await painting.save();/* Saving paintings in database*/
    console.log(painting);
}}


seedDB();

// db.close();