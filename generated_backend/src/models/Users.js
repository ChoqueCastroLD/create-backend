

const db = require('@models/database.js');


const User = {
    /** Returns an array of users */
    async getAll(){
        let result = await db.query('SELECT id, name, email FROM users');
        return result;
    },
    /** Returns a user by its id */
    async getById(id){
        let result = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
        return result[0];
    },
    /** Adds a new user to database*/
    async create(name, email){
        let result = await db.query('INSERT INTO users(id, name, email) VALUES(0, ?, ?)', [name, email]);
        return result;
    },
    /** Update an existing user */
    async update(id, name, email){
        let result = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        return result;
    },
    /** Deletes an existing user */
    async delete(id){
        let result = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}


module.exports = User;