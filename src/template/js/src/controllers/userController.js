const httpStatus = require('http-status');
<% if(aliases === true) { %>
const userModel = require('@models/Users.js');
<% } else { %>
const userModel = require('../models/Users.js');
<% } %>

<% if(database == 'mysql (no sequelize)') { %>
module.exports = {
    async getUserById(req, res){
        try {
            let {id} = req.params;

            if(id){
                let data = await userModel.getById(id);
    
                let message = (data) ? 'User found' : 'User not found';
                
                res.json({status: true, message, data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Sometimes things go wrong :(', err});
        }
    },
    async getUsers(req, res){
        try {
            let data = await userModel.getAll();

            let message = (data.length > 0) ? 'Users found' : 'There are no users';

            res.json({status: true, message, data});
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Sometimes things go wrong :(', err});
        }
    },
    async newUser(req, res){
        try {
            let { name, email } = req.body;
            
            if(name && email){
                let data = await userModel.create(name, email);

                res.json({status: true, message: 'User added, returning added user id', id: data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Adding user failed', data});
        }
    },
    async updateUser(req, res){
        try {
            let { id, name, email } = req.body;
            
            if(id && name && email){
                let data = await userModel.update(id, name, email);

                res.json({status: true, message: 'User updated successfully', data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Could not update user', err});            
        }
    },
    async deleteUser(req, res){
        try {
            let { id } = req.params;

            if(id){
                let data = await userModel.delete(id);

                res.json({status: true, message: 'User deleted', data});
            } else{
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch(err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: "Deleting user failed", err});
        }
    }
}
<% } else { %>
module.exports = {
    async getUserById(req, res){
        try {
            let {id} = req.params;

            if(id){
                let data = await userModel.findOne({where: {id}});
    
                let message = (data) ? 'User found' : 'User not found';
                
                res.json({status: true, message, data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Sometimes things go wrong :(', err});
        }
    },
    async getUsers(req, res){
        try {
            let data = await userModel.findAll();

            let message = (data.length > 0) ? 'Users found' : 'There are no users';

            res.json({status: true, message, data});
        } catch (err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Sometimes things go wrong :(', err});
        }
    },
    async newUser(req, res){
        try {
            let { name, email } = req.body;
            
            if(name && email){
                let data = await userModel.create({name, email});

                res.json({status: true, message: 'User added, returning added user id', id: data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Adding user failed', data});
        }
    },
    async updateUser(req, res){
        try {
            let { id, name, email } = req.body;
            
            if(id && name && email){
                let data = await userModel.updateUser({name, email}, {where:{id}});

                res.json({status: true, message: 'User updated successfully', data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (error) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: 'Could not update user', err});            
        }
    },
    async deleteUser(req, res){
        try {
            let { id } = req.params;

            if(id){
                let data = await userModel.destroy({where: {id}});

                res.json({status: true, message: 'User deleted', data});
            } else{
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch(err) {
            res
            .status(httpStatus.CONFLICT)
            .json({status: false, message: "Deleting user failed", err});
        }
    }
}
<% } %>