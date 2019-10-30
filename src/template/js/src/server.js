<% if(aliases === true) { %>
// Register module/require aliases
require('module-alias/register');
<% } %>
// Load .env Enviroment Variables to process.env
require('mandatoryenv').load([
    'DB_HOST',
    'DB_DATABASE',
    'DB_USER',
    'DB_PASSWORD',
    'PORT',
    'SECRET_KEY'
]);
const { PORT } = process.env;

// Patches
require('express-exception-handler').handle(); // Patch express in order to use async / await syntax

// Require Dependencies

const express = require('express');
<% if(logger === 'morgan') { %>
const morgan = require('morgan');
<% } %>
<% if(logger === 'voleyball') { %>
const voleyball = require('voleyball');
<% } %>
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Instantiate an Express Application

const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
<% if(logger === 'morgan') { %>
app.use(morgan('dev'));
<% } %>
<% if(logger === 'voleyball') { %>
app.use(volleyball);
<% } %>
app.use(cookieParser());
app.use(cors());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes
<% if(aliases === true) { %>
app.use('/', require('@routes/router.js'));
<% } else { %>
app.use('/', require('./routes/router.js'));
<% } %>

// Handle errors
app.use((err, req, res, next) => {
    if(err){
        res
        .status(409)
        .send({status: false,message: err+''});
    } else {
        next();
    }
});

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})
// Open Server on configurated Port

app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);