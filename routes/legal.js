const express = require('express');
const router = express.Router();

/*creating the privacy policy route*/
router.get('/privacyPolicy', (req,res) => {
    res.render('legal/privacyPolicy')
});

/*creating the terms and conditions route*/
router.get('/termsAndConditions', (req, res) => {
    res.render('legal/termsAndConditions')
});

router.get('/sales-and-refunds', (req, res) => {
    res.render('legal/sales-and-refunds')
})

module.exports = router;