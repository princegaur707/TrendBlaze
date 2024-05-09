const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const User = require('../models/user');
const Product = require('../models/product');
const {showCart, addToCart, deleteFromCart} = require('../controllers/cart');

router.get('/user/cart', isLoggedIn, showCart);

router.post('/user/:productid/add', isLoggedIn, addToCart);

router.delete('/user/:productid', isLoggedIn, deleteFromCart)

module.exports = router;