<% if(database == 'mongodb') { %>
const {
    DB_URL
} = process.env;
<% } else { %>
const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;
<% } %>

<% if(database == 'mongodb') { %>
const {MongoClient} = require("mongodb");

let conn = new MongoClient(DB_URL, {useUnifiedTopology: true});

module.exports = {
    /**
     * Singleton-like Database Object that connects to the mongodb database
     */
    async getDbo(){
        if(!conn.isConnected())
            await conn.connect();
        return conn.db();
    }
}
<% } else if(database == 'mysql (no sequelize)') { %>
const mysqlm = require('mysqlm');

module.exports = mysqlm.connect({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
})
<% } else { %>
const Sequelize = require('sequelize');

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialect: <%= database %>,
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    },
    define: {
        timestamps: false
    }
});

module.exports = db;
<% } %>