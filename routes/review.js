const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn, validateReview} = require('../middleware');
const { createReview } = require('../controllers/review');

router.post('/products/:productid/review', isLoggedIn, validateReview, createReview );


module.exports = router;

//flash uses express-session to store the messages