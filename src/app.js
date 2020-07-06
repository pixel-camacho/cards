require('dotenv').config();
require('./database');

// dependencias
const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const bodyparser =  require('body-parser');
const flash   = require('connect-flash');

// initialize
const app = express();

// setting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/login.routes'));

// Middleware
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Global var
app.use( (req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
})

module.exports = app;