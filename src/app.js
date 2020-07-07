require('dotenv').config();
require('./database');

// dependencias
const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const flash   = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./config');

// initialize
const app = express();

// setting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Global var
app.use( (req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.usuario;
    console.log(app.locals); 
    next();
});

//routes
app.use(require('./routes/authenticator.routes'));


module.exports =  app;