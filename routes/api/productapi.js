const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middleware');
const User = require('../../models/user');


router.post('/product/:productid/like', isLoggedIn, async(req, res) => {
    
    const {productid} = req.params;

    //grab the current loggedin user 
    const user = req.user;

    const isLiked = user.wishList.includes(productid)
    //if productid is already in the wishlist then isLiked will be true otherwise false

    const option = isLiked ? '$pull' : '$addToSet';
    //$pull is for deleting if exists
    //$addToSet is for adding if do not exists

    //Now we need to make changes in our database so, we will need User model
    //if productid exist in wishlist remove(pull) it otherwise add it(addtoset)
    req.user = await User.findByIdAndUpdate(req.user._id, {[option]:{wishList:productid}},{new: true});
    //option is a key which can only be used this way [option] inside other function
    //we want to update the current user instanstly so we did req.user = ...
    //new: true will make sure to return the updated entries otherwise it gives previous version
	
    res.send('LIKE API');
});
//we are using post request because we want to change something on server side


module.exports = router;
