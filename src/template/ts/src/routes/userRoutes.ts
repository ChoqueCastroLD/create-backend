import express from "express";

const router = express.Router();

<% if(aliases === true) { %>
import usersController from "@controllers/userController";
<% } else { %>
import usersController from "../controllers/userController";
<% } %>

router.get('/api/users/:id', usersController.getUserById);

router.get('/api/users', usersController.getUsers);

router.post('/api/users', usersController.newUser);

router.delete('/api/users/:id', usersController.deleteUser);

router.put('/api/users', usersController.updateUser);


export default router;