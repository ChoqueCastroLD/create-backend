const Sequelize = require('sequelize');

const config = require('../config/config.js');

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
    <% if(database == 'sqlite') { %>
    storage: config.database.storage,
    <% } %>
    define: {
        timestamps: false
    }
});

module.exports = db;