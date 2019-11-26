<% if(database == 'mongodb') { %>
<% if(aliases === true) { %>
import db from "@models/database";
<% } else { %>
import db from "../models/database";
<% } %>

const user = {
    /** Returns an array of users */
    async getAll(){
        let dbo = await db.getDbo();

        let result = await dbo.collection('users').find();

        return result;
    },
    /** Returns a user by its id */
    async getById(id){
        let dbo = await db.getDbo();
        
        let result = await dbo.collection('users').findOne({});
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
<% } else if(database == 'mysql (no sequelize)') { %>
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
<% } else if (database == 'mongodb') { %>
<% if(aliases === true) { %>
import database from "@models/database";
<% } else { %>
import database from "../models/database";
<% } %>

const users = {

    async getAll() {
        const dbo = await database.getDbo();

        return await dbo.collection('users').find().toArray();
    },

    async search(good) {
        const dbo = await database.getDbo();

        const {_id} = good;

        return await dbo.collection('users').find({_id: new ObjectId(_id)}).toArray();
    },

    async create(good) {
        const dbo = await database.getDbo();
        
        delete good._id;
        delete good.id;
        
        await dbo.collection('users').insertOne(good);
    },

    async update(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        delete good._id;
        delete good.id;

        await dbo.collection('users').updateOne({_id:  new ObjectId(_id)},{$set: good});
    },

    async delete(good) {
        const dbo = await database.getDbo();

        const {_id} = good;
        
        await dbo.collection('users').deleteOne({_id: new ObjectId(_id)});
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