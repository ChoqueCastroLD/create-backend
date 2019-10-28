<% if(aliases === true) { %>
// Register module/require aliases
import 'module-alias/register';
<% } %>
// Require Dependencies
import env from "dotenv"
import express from "express"
<% if(logger === 'morgan') { %>
import morgan from "morgan"
<% } if(logger === 'voleyball') { %>
import voleyball from "voleyball"
<% } %>
import cookieParser from "cookie-parser"
import cors from "cors"

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
import router from "./routes/router"
app.use('/', router);

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