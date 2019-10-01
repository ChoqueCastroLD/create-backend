const express = require('express');
const router = express.Router();

const userController = require('../controller/userController.js');


router.get('/:id', userController.getUserById);

router.get('/', userController.getUsers);

router.post('/', userController.newUser);

router.delete('/', userController.deleteUser);

router.put('/', userController.updateUser);


module.exports = router;