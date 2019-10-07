import express from "express";

const router = express.Router();

<% if(aliases === true) { %>
import usersController from "@controllers/userController";
<% } else { %>
import usersController from "../controllers/userController";
<% } %>

router.get('/:id', usersController.getUserById);

router.get('/', usersController.getUsers);

router.post('/', usersController.newUser);

router.delete('/', usersController.deleteUser);

router.put('/', usersController.updateUser);


export default router;