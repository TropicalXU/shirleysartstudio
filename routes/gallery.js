const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const Painting = require('../models/painting');

/*creating the gallery route*/
/*fetching paintings from the database*/
/*including fetched paintings in our render to access from frontend*/
router.get('/', catchAsync(async(req,res) => {
    const paintings = await Painting.find({});
    res.render('main/gallery', {paintings})
}))

/*creating the gallery/landscape route*/
router.get('/landscape',catchAsync(async (req, res) => {
    const paintings = await Painting.find({});
    res.render('collections/landscape', {paintings});
}))

/*creating the gallery/landscape route*/
router.get('/landscape/:id', (req, res) => {
    res.redirect('/gallery/landscape')
})

/*creating the gallery/seascape route*/
router.get('/seascape',catchAsync(async (req, res) => {
    const paintings = await Painting.find({});
    res.render('collections/seascape', {paintings});
}))

/*creating the gallery/floral route*/
router.get('/floral',catchAsync(async (req, res) => {
    const paintings = await Painting.find({});
    res.render('collections/floral', {paintings});
}))

/*creating the gallery/show route*/
/*fetching the painting id from the request params and populating the painting to show route*/
router.get('/:id', async(req, res) => {
 const painting = await Painting.findById(req.params.id).populate();
 if(!painting) {
    req.flash('error', 'Painting does not exist');
    return res.redirect('/gallery');
 }
 res.render('main/show', {painting});
})


module.exports = router;