const mysql = require('mysql');
const config = require('../config/config.js');

const pool  = mysql.createPool(config.mysql);

module.exports = {

    /** Do a query to the database, returns a result or an error */
    query(queryString = '', inputData = []){
        return new Promise( (resolve, reject) => {

            pool.query(queryString, inputData, function (error, results) {
                if (error)
                    reject({errno: error.errno, code: error.code});
                else
                    resolve(results);
            } );

        })
    }

}