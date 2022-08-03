if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const paintings = require('../seeds/paintings');
const Painting = require('../models/painting');
const Cart = require('../models/cart');
const painting = require('../models/painting');

/* creating the checkout root */
/* if no cart session show null*/
/* else create a new cart session - accessing our generate array function so we can push/display items on frontend*/
router.get('/', (req, res) => {
    if(!req.session.cart) {
        return res.render('main/checkout', {paintings: null});
    }else {
    const cart = new Cart(req.session.cart);
    res.render('main/checkout', 
    {paintings: cart.generateArray(), totalPrice:cart.totalPrice,
        // paypalClientId: process.env.PAYPAL_CLIENT_ID
        });
    }
});

/* creating the checkout/:id route*/
/* creating and adding items to our cart within the user session*/
router.get('/:id', async(req,res) => {
    const paintingId = req.params.id;
    const cart = new Cart(
        req.session.cart ? req.session.cart : {}
    );
    Painting.findById(paintingId, (err, painting) => {
      if(err) {
        req.flash('error', 'Something went wrong!');
        res.redirect('back');
      }
      cart.add(painting, painting.id);
      
       req.session.cart = cart;
       req.flash('success', 'Successfully added to cart!');
       res.redirect('back');
       console.log(req.session.cart);
   
    });
});


/* creating and posting our order route using paypal button*/


module.exports = router;