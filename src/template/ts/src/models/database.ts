<% if(database == 'mysql (no sequelize)') { %>
import mysql from "mysql";

<% if(aliases === true) { %>
import config from "@config/config";
<% } else { %>
import config from "../config/config";
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
import Sequelize from "sequelize";

<% if(aliases === true) { %>
import config from "@config/config";
<% } else { %>
import config from "../config/config";
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

export default db;