
const mysql = require('mysql.js');

const config = require('../config/config.js');


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



module.exports = db;