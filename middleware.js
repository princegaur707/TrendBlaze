const Product = require('./models/product');
const {productSchema, reviewSchema} = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'You need to login first'});
        //401-> unauthorized user
    }
    
    req.session.returnUrl= req.originalUrl;
    //originalUrl is already present in req 
    // console.log(req.session); 

    if(!req.isAuthenticated()) {
        req.flash('error','Please Login to move ahead...');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateProduct = (req, res, next) => {
    const{name, img, desc, price} = req.body;
    const{error} = productSchema.validate({name, img, price, desc});
    //validate is provided by Joi
    
    if(error) {
        const msg = error.details.map((err) => err.message).join(',')
        //adding all the errors under the detail tag
        return res.render('error', {err : msg});
    }
    next();
}


module.exports.validateReview = (req, res, next) => {
    const{rating, comment} = req.body;
    const{error} = reviewSchema.validate({rating, comment});
    if(error) {
        const msg = error.details.map((err) => err.message).join(',')
        //adding all the errors under the detail tag
        
        return res.render('error', {err : msg});
    }
    next();
}
module.exports.IsSeller = (req, res, next) => {
    if(!(req.user.role && req.user.role === 'seller')){
        req.flash('error', 'You don\'t have permission to do that');
        return res.redirect('/products');
    }
    next(); 
}
module.exports.IsProductAuthor = async(req, res, next) => {

    //Getting a product id
    const{id} = req.params;

    const product = await Product.findById(id);
    //we need to find the product so tha we can use the author property of it to match

    if(!(product.author && product.author.equals(req.user._id))) {
        //only equals function is working here neither == nor ===
        req.flash('error', 'You don\'t have permission to do that');
        return res.redirect(`/products/${id}`);
    }
    next();
}
