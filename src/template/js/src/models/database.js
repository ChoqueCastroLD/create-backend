<% if(database == 'mysql (no sequelize)') { %>
const mysql = require('mysql.js');
<% if(aliases === true) { %>
const config = require('@config/config.js');
<% } else { %>
const config = require('../config/config.js');
<% } %>

const db = {
    /**
     *  Queries the database
     * 
     * @param {String} query - Query string to be executed
     * @param {Array<Object>} input - Input parameters for prepared statements
     */
    async query(query = '', input = []) {
        return new Promise((resolve, reject) => {
            pool.query(query, input,(err, result)=>{
                if(err) reject(err);
                else resolve(result);
            })
        })
    }
}

<% } else { %>
const Sequelize = require('sequelize');
<% if(aliases === true) { %>
const config = require('@config/config.js');
<% } else { %>
const config = require('../config/config.js');
<% } %>

const db = new Sequelize(config.database.database, config.database.user, config.database.password, {
    host: config.database.host,
    pool: {
        max: config.database.connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialect: config.database.engine,
    <% if(database == 'mssql') { %>
    dialectOptions: {
        options: {
            useUTC: false,
            dateFirst: 1,
        }
    },
    <% } if(database == 'sqlite') { %>
    storage: config.database.storage,
    <% } %>
    define: {
        timestamps: false
    }
});

<% } %>

module.exports = db;