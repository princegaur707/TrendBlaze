//We need this separate model because we want to establish one to many relationship

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        trim: true,
    }
},{timestamps:true});
//helpul for getting timestamp of review

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;
