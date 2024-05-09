const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {validateProduct, isLoggedIn, IsSeller, IsProductAuthor} = require('../middleware');
const {showAllProducts, productForm, createProduct, showProduct, editProductForm, updateProduct, deleteProduct, homepage} = require('../controllers/product')

router.route('/')
    .get(showAllProducts)
    .post(isLoggedIn, validateProduct, IsSeller, createProduct);

router.get('/new', isLoggedIn, IsSeller, productForm);

router.route('/:id')
    .get(showProduct)
    .patch(IsProductAuthor, isLoggedIn, validateProduct, updateProduct)
    .delete(IsProductAuthor, isLoggedIn, deleteProduct)

router.get('/:id/edit', IsProductAuthor ,isLoggedIn, editProductForm);

module.exports = router;
