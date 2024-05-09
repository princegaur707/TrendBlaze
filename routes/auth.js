const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {registerForm, registerNewUser, loginForm, loginUser, logout} = require('../controllers/auth')

// router.get('/demouser', async(req, res) => {
    
//     const user = {
//         email: 'prince@gmail.com',
//         username: 'Prince'
//     }
//     const newUser = await User.register(user, 'prince123');
//     res.send(newUser);
// });


router.route('/register')
    .get(registerForm)
    .post(registerNewUser)

    
router.route('/login')
    .get(loginForm)
    .post(passport.authenticate('local', {//This 'authenticate' method is of passport
            failureRedirect: '/login',//if there is failure redirect here
            failureFlash: true }),//lets to use flash messages
            loginUser);
//This authenticate will call User.authenticate in app.js and will provide
//username and password inside it which will validate if yes, then this will allow us to login

router.get('/logout', logout);

module.exports = router;
