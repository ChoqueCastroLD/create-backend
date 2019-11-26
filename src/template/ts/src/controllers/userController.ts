import s from "http-status";
<% if(aliases === true) { %>
import usersModel from "@models/users";
<% } else { %>
import usersModel from "../models/users";
<% } %>

import has from "has-keys";

<% if(database == 'mysql (no sequelize)') { %>
export default {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the ID'};

        let {id} = req.params;

        let data = await usersModel.getById(id);

        if(!data)
            throw {code: status.BAD_REQUEST, message: 'User not found'};
            
        res.json({status: true, message: 'Returning user', data});
    },
    async getUsers(req, res){
        let data = await usersModel.getAll();

        if(!data)
            throw {code: status.BAD_REQUEST, message: 'User not found'};
            
        res.json({status: true, message: 'Returning users', data});
    },
    async newUser(req, res){
        if(!has(req.params, ['name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name and email'};

        let { name, email } = req.body;
        
        await usersModel.create(name, email);

        res.json({status: true, message: 'User added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
        
        await usersModel.update(id, name, email);

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let { id } = req.params;

        await usersModel.delete(id);

        res.json({status: true, message: 'User deleted'});
    }
}
<% } else { %>
export default {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await usersModel.findOne({where: {id}});

        if(!data)
            throw {code: status.BAD_REQUEST, message: 'User not found'};

        res.json({status: true, message: 'Returning user', data});
    },
    async getUsers(req, res){
        let data = await usersModel.findAll();

        res.json({status: true, message: 'Returning users', data});
    },
    async newUser(req, res){
        if(!has(req.params, ['name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name and email'};

        let { name, email } = req.body;
            
        let data = await usersModel.create({name, email});

        res.json({status: true, message: 'User added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
            
        let data = await usersModel.updateUser({name, email}, {where:{id}});

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};
            
        let { id } = req.params;

        let data = await usersModel.destroy({where: {id}});

        res.json({status: true, message: 'User deleted', data});
    }
}
<% } %>