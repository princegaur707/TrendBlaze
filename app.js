if(process.env.NODE_ENV !== 'production'){//we will be using this only in developer mode
    require('dotenv').config();
}//For production we have different way

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

//Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment')

//APIs
const productApis = require('./routes/api/productapi');

const dbUrl = process.env.dbUrl || 'mongodb://localhost:27017/shopping-app'

mongoose.connect(dbUrl)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize());
app.use(helmet({contentSecurityPolicy:false}));//false to ignore for now

// Sets all of the defaults, but overrides `script-src`
// and disables the default `style-src`.
// app.use(
//     helmet({
//       contentSecurityPolicy: {
//         directives: {
//           "script-src": ["'self'", "example.com"],
//           "style-src": null,
//         },
//       },
//     }),
//   );



// app.use(
//     mongoSanitize({
//       replaceWith: '12346789',
//     }),
//   );

const secret = process.env.SECRET || 'weneedsomebettersecret'


const store = MongoStore.create({
    store: secret,
    mongoUrl: dbUrl, 
    touchAfter: 24 * 3600//store the session for 24 hours
});

const sessionConfig = {
    store,//storing the sesion in mongoDB, adv: even if we close session we remain logged in
    name:'session',//providing different name to avoid default
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,//cookies cannot be accessed by JavaScript
        // expires: Date.now() + 1000* 30,
        maxAge:1000* 300 *300
        //maxAge works same as expire but when I tried maxAge alone or with expire
        //then only worked fine
    }
}

app.use(session(sessionConfig));
app.use(flash());

//Initializing middlewares for passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Telling the passport to check for username and password using authenticate method
passport.use(new LocalStrategy(User.authenticate()));
//         write strategy first    then the function we will use to authenticate(this 'authenticate' function is of passport-local-mongoose file which already contain the whole code which is shown on passport website for passport-local)
//                                  we can declare this function ourselves

//locals are variables which are available everywhere
app.use((req, res, next) => {
    // console.log(process.env.NAME);
    // console.log("START")
    console.log(req.query);//We can sanitized URL via this
    // console.log("END")
    res.locals.currentUser = req.user;//If not logged in undefined will go
    res.locals.success = req.flash('success');//success message corresponding to the success key
    res.locals.error = req.flash('error');
    next();
});



app.use('/products', productRoutes);//now this will run only for '/products' one
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productApis);
app.use(cartRoutes);
app.use(paymentRoutes);


app.all('*', (req, res) => {//fallback: In case request do not matches with any route
    //'all' will work for all types of request get, post, patch etc.
    res.render('error', {err: 'You are requesting a wrong url!!!'});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});