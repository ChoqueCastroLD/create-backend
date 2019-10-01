import mysql from "mysql";

import config from "../config/config";

const pool  = mysql.createPool(config.mysql);

export default {

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