<% if(database == 'mysql (no sequelize)') { %>
<% if(aliases === true) { %>
import db from "@models/database";
<% } else { %>
import db from "../models/database";
<% } %>

const user = {
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
<% } else { %>
import Sequelize from "sequelize";

<% if(aliases === true) { %>
import db from "@models/database";
<% } else { %>
import db from "../models/database";
<% } %>

const user = db.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
})
<% } %>

export default user;