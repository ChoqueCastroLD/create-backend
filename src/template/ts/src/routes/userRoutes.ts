import express from "express";

const router = express.Router();

import usersController from "../controllers/userController";

router.get('/:id', usersController.getUserById);

router.get('/', usersController.getUsers);

router.post('/', usersController.newUser);

router.delete('/', usersController.deleteUser);

router.put('/', usersController.updateUser);


export default router;