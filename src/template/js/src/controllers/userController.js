const s = require('http-status');
<% if(aliases === true) { %>
const userModel = require('@models/users.js');
<% } else { %>
const userModel = require('../models/users.js');
<% } %>

const has = require('has-keys');

<% if(database == 'mysql (no sequelize)') { %>
module.exports = {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: s.BAD_REQUEST, message: 'You must specify the ID'};

        let { id } = req.params;

        let data = await userModel.getById(id);

        if(data.length > 0)
            res.json({status: true, message: 'Returning user', data});
        else
            res.json({status: false, message: 'User not found'});
    },
    async getUsers(req, res){
        let data = await userModel.getAll();

        if(data.length > 0)
            res.json({status: true, message: 'Returning users', data});
        else
            res.json({status: false, message: 'Users not found'});
    },
    async newUser(req, res){
        if(!has(req.params, ['name', 'email']))
            throw {code: s.BAD_REQUEST, message: 'You must specify the name and email'};

        let { name, email } = req.body;
    
        await userModel.create(name, email);

        res.json({status: true, message: 'User added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: s.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
    
        await userModel.update(id, name, email);

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: s.BAD_REQUEST, message: 'You must specify the id'};

        let { id } = req.params;

        await userModel.delete(id);

        res.json({status: true, message: 'User deleted'});
    }
}
<% } else { %>
module.exports = {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: s.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await userModel.findOne({where: {id}});

        if(data.length > 0)
            res.json({status: true, message: 'Returning user', data});
        else
            res.json({status: false, message: 'User not found'});
    },
    async getUsers(req, res){
        let data = await userModel.findAll();

        if(data.length > 0)
            res.json({status: true, message: 'Returning users', data});
        else
            res.json({status: false, message: 'Users not found'});
    },
    async newUser(req, res){
        if(!has(req.params, ['name', 'email']))
            throw {code: s.BAD_REQUEST, message: 'You must specify the name and email'};

        let { name, email } = req.body;
        
        await userModel.create({name, email});

        res.json({status: true, message: 'User Added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: s.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
    
        await userModel.updateUser({name, email}, {where:{id}});

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: s.BAD_REQUEST, message: 'You must specify the id'};

        let { id } = req.params;

        await userModel.destroy({where: {id}});

        res.json({status: true, message: 'User deleted'});
    }
}
<% } %>