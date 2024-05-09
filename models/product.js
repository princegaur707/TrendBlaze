const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true,
        default: '/images/product.jpg'
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    desc: {
        type: String,
        trim: true
    },
    avgRating: {
        type: Number, 
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [//represent review id connected with this product
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'//we are telling here which model to use
        }
    ]
});

// productSchema.pre('findOneAndDelete', async function(data) {
//     console.log('Pre Middleware function');
//     console.log(data);
// });
//This function was just showing anonymous function as it don't contain any data till now


//Mongoose middleware function to delete all the associated reviews on a product
//Already defined middleware in mongoose
productSchema.post('findOneAndDelete', async function(product) {//without being async this function will not work
    if(product.reviews.length > 0) {
        await Review.deleteMany({_id: {$in: product.reviews}});//$in operator accepts array
    }
}); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 