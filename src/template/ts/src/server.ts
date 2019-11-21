<% if(aliases === true) { %>
// Register module/require aliases
import 'module-alias/register';
<% } %>

// Patches
import { inject } from "express-custom-error" // Patch express in order to use async / await syntax
inject();

// Require Dependencies
import env from "mandatoryenv"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"

<% if(aliases === true) { %>
import logger from "@util/logger"
<% } else { %>
import logger from "./util/logger"
<% }%>

// Load .env Enviroment Variables to process.env
env.load([
    'DB_HOST',
    'DB_DATABASE',
    'DB_USER',
    'DB_PASSWORD',
    'PORT',
    'SECRET_KEY'
]);

const { PORT } = process.env;

// Instantiate an Express Application

const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes
import router from "./routes/router"
app.use('/', router);

// Handle errors
app.use((err, req, res, next) => {
    if(err){// Check if there's an error
    <% if(rest) { %>
        if(err.code && err.message){ // Handle custom error
            res
            .status(err.code)
            .send({status: false,message: err.message});
        } else { // Handle all other errors
            res
            .status(400)
            .send({status: false,message: err});
        }
    <% } else { %>
        res
        .status(400)
        .send({status: false,message: err});
    <% } %>
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