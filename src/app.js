require('dotenv').config();

// dependencias
const express = require('express');
const morgan  = require('morgan');
const path    = require('path');
const bodyparser =  require('body-parser');


// initialize
const app = express();

// setting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

//routes
app.use('/cards',require('./routes/login.route'));

// Middleware
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Global var

module.exports = app;