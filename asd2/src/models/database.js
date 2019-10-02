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
    
    define: {
        timestamps: false
    }
});

module.exports = db;