import db from "./database";

export default {
    /** Returns a list of users */
    async getUsers(){
        let users = await db.query('SELECT id, name, email FROM users');

        return users;
    },
    /** Returns a users based on its id */
    async getUserById(id){
        let users = await db.query('SELECT id, name, email FROM users WHERE id = ?', id);

        return users[0];
    },
    /** Adds a new user */
    async addUser(name, email){
        let res = await db.query('INSERT INTO users (id, name, email) VALUES (0, ?, ?)', [name, email]);

        return res;
    },
    /** Update a user's name and email based on its id */
    async updateUser(id, name, email){
        let res = await db.query('UPDATE users SET name = ? email = ? WHERE id = ?', [name, email, id]);

        return res;
    },
    /** Remove a user from database based on its id */
    async deleteUser(id){
        let res = await db.query('DELETE FROM users WHERE id = ?', [id]);

        return res;
    }
}