if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
//REQUIRING OUR PACKAGES
const express = require('express');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash')
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const contact = require('./routes/contact');
const legal = require('./routes/legal');
const gallery = require('./routes/gallery');
// const checkout = require('./routes/checkout');

//creating the mongo store
const MongoDBStore = require("connect-mongo");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/shirleys-studio';

//CONNECTING TO DATABASE
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();
// APP CONFIGURATION
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: false
}));

app.use(mongoSanitize({
    replaceWith: '_'
}))

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


const secret = process.env.SECRET;

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

//APP SESSIONS 
const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
    
}

app.use(session(sessionConfig));
app.use(express.json());
app.use(flash());
//setting up security using helmet
app.use(helmet());

app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.referrerPolicy());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://ajax.googleapis.com",
    "http://fonts.googleapis.com",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com",
    "https://cdnjs.cloudflare.com",
];
const connectSrcUrls = [
    "https://cdnjs.cloudflare.com"
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com"
  
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'","'unsafe-eval'",...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'","https://cdnjs.cloudflare.com", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dhrs5mwhz/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
               
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.session = req.session;
    next();
});

app.use('/contact', contact);
app.use('/legal', legal);
app.use('/gallery', gallery);
// app.use('/checkout', checkout);

//CREATING FLASH MIDDLEWARE TO USE IN ROUTER TO ACCESS ANYWHERE
//on every single request what ever is in the flash
//under success we will have access to in our locals 
//under the key success
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found', 404))
// })

app.get('/', (req, res) => {
    res.render('home')
})

//checkout route(not in use) --for future development
// app.get('/remove/:id', async(req,res, next) => {
//     const paintingId = req.params.id;
//     const cart = new Cart(req.session.cart? req.session.cart:{});
//     cart.remove(paintingId);
//     req.session.cart = cart;
//     res.redirect('/checkout')
// })

app.get('/about', (req, res) => {
    res.render('main/about')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})


