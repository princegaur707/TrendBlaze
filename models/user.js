const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String, 
        default: 'buyer'
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'//ref tell in which model to look
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});
userSchema.plugin(passportLocalMongoose);
//This passport-local-mongoose package will eliminate the need to add username
//and password fields in the model

const User = mongoose.model('User', userSchema);

module.exports = User;
