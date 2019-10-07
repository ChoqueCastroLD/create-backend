<% if(aliases === true) { %>
// Register module/require aliases
require('module-alias/register');
<% } %>
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

// Load .env Enviroment Variables to process.env

require('dotenv').config();


// Load config
<% if(aliases === true) { %>
const config = require('@config/config.js');
<% } else { %>
const config = require('./config/config.js');
<% } %>


// Instantiate an Express Application

const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
<% if(logger === 'morgan') { %>
app.use(morgan(config.app.logFormat));
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

// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {msg: 'Endpoint Not Found'} );
})

// Open Server on configurated Port

app.listen(
    config.app.port,
    () => console.info('Server listening on port ', config.app.port)
);