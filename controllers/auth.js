module.exports.registerForm = (req, res) => {
    res.render('auth/signup');
}

module.exports.registerNewUser = async(req, res) => {
    try {
        const {username, password, email, role} = req.body;
        const user = new User({username, email, role});
        const newUser = await User.register(user, password);//newUser required for auto login
        req.login(newUser, function(err) {//For automatically log in on registering
            if(err) { 
                return next(err);
            }
            req.flash('success', 'You are Registered successfully!')
            return res.redirect('/products');
        });
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) =>{
    res.render('auth/login');
}

module.exports.loginUser = (req, res) => {
    // console.log(req.user);//this contains whole  user
    req.flash('success', `Welcome back ${req.user.username}!!!`);

    let redirectUrl = req.session.returnUrl || '/products';
    console.log(`redirectUrl ${redirectUrl}`);


    //Removing review from the url as in case of submitting review we will be redirected to product/productid/review
    //as get request, this link do not exist so this means we have to check if this link is called then 
    //we have to redirect it to product/productid
    if(redirectUrl && redirectUrl.indexOf('review') !== -1) {
        redirectUrl = redirectUrl.split('/');
        redirectUrl.pop();
        redirectUrl = redirectUrl.join('/');
    }
    // console.log("Login Page session-------->")
    // console.log(req.session);
    //this req.session is not showing redirectUrl
    
    delete req.session.returnUrl;
    res.redirect(redirectUrl);
    //redirect sends the GET request
}

module.exports.logout = (req, res) => {
    req.logout(function(err) {//This req.logout is enough for getting logged out
        if (err) { return next(err); }
        req.flash('success', 'Hope to see u soon!');
        res.redirect('/products');
      });
}
