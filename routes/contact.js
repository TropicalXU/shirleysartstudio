const express = require('express');
const catchAsync = require('../utils/catchAsync');
const sendMail = require('../public/javascripts/mail');
const router = express.Router();
const {contactSchema} = require('../schemas')
const { validateContact } = require('../middleware');

/* creating the contact-form route*/
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views/main', 'contact.ejs'));
    res.render('main/contact')
})

/* creating and posting the contact form route*/
/* using the sendmail package as my form of email communication*/
/* accessing form data from the body req and responding with sendMail function*/
router.post('/',  catchAsync (async(req, res) => {
    const validate = contactSchema.validate(req.body);
    console.log(validate);
    const { name, email, subject, text } = req.body;
    console.log('Data', req.body);
    sendMail(name, email, subject, text, function(err, data) {
        if(err) {
            console.log('ERROR:', err)
            req.flash('error', 'Please fill out all fields required!')
            res.redirect('/contact')
        }else {
            req.flash('success', 'Message successfully sent!')
            res.redirect('/contact')
            
        }
    
    });
    
}));

module.exports = router;