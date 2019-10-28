import httpStatus from "http-status";
<% if(aliases === true) { %>
import usersModel from "@models/Users";
<% } else { %>
import usersModel from "../models/Users";
<% } %>

<% if(database == 'mysql (no sequelize)') { %>
export default {
    async getUserById(req, res, next){
        try {
            let {id} = req.params;

            if(id){
                let data = await usersModel.getById(id);
    
                let message = (data) ? 'User found' : 'User not found';
                
                res.json({status: true, message, data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);
        }
    },
    async getUsers(req, res, next){
        try {
            let data = await usersModel.getAll();

            let message = (data.length > 0) ? 'Users found' : 'There are no users';

            res.json({status: true, message, data});
        } catch (err) {
            next(err);
        }
    },
    async newUser(req, res, next){
        try {
            let { name, email } = req.body;
            
            if(name && email){
                let data = await usersModel.create(name, email);

                res.json({status: true, message: 'User added, returning added user id', id: data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);
        }
    },
    async updateUser(req, res, next){
        try {
            let { id, name, email } = req.body;
            
            if(id && name && email){
                let data = await usersModel.update(id, name, email);

                res.json({status: true, message: 'User updated successfully', data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);           
        }
    },
    async deleteUser(req, res, next){
        try {
            let { id } = req.params;

            if(id){
                let data = await usersModel.delete(id);

                res.json({status: true, message: 'User deleted', data});
            } else{
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch(err) {
            next(err);
        }
    }
}
<% } else { %>
export default {
    async getUserById(req, res, next){
        try {
            let {id} = req.params;

            if(id){
                let data = await usersModel.findOne({where: {id}});
    
                let message = (data) ? 'User found' : 'User not found';
                
                res.json({status: true, message, data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);
        }
    },
    async getUsers(req, res, next){
        try {
            let data = await usersModel.findAll();

            let message = (data.length > 0) ? 'Users found' : 'There are no users';

            res.json({status: true, message, data});
        } catch (err) {
            next(err);
        }
    },
    async newUser(req, res, next){
        try {
            let { name, email } = req.body;
            
            if(name && email){
                let data = await usersModel.create({name, email});

                res.json({status: true, message: 'User added, returning added user id', id: data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);
        }
    },
    async updateUser(req, res, next){
        try {
            let { id, name, email } = req.body;
            
            if(id && name && email){
                let data = await usersModel.updateUser({name, email}, {where:{id}});

                res.json({status: true, message: 'User updated successfully', data});
            } else {
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch (err) {
            next(err);           
        }
    },
    async deleteUser(req, res, next){
        try {
            let { id } = req.params;

            if(id){
                let data = await usersModel.destroy({where: {id}});

                res.json({status: true, message: 'User deleted', data});
            } else{
                res
                .status(httpStatus.BAD_REQUEST)
                .json({status: false, message: 'You did not specified all needed parameters'});
            }
        } catch(err) {
            next(err);
        }
    }
}
<% } %>