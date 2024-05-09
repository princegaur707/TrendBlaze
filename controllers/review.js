const Product = require('../models/product');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {

    try {
        const {productid} = req.params;
        const product = await Product.findById(productid);
        const {rating} = req.body;
        const review = new Review({...req.body})
        //spread operator(...) inserts everything inside new object(review) from existing one(req.body)

        //Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
        //Fixing rating to one decimal point

        product.reviews.push(review);//inserting object id of new review in the product

        await review.save(); //we need to save the changes made 
        await product.save();

        req.flash('success', 'review successfully added')//this message will get stored in session
        res.redirect(`/products/${productid}`);
    }
    catch(e) {
        res.status(500).render('error', {err: e.message});
    }
}
