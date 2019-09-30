const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController.js');


router.get('/:id', usersController.getUserById);

router.get('/', usersController.getUsers);

router.post('/', usersController.newUser);

router.delete('/', usersController.deleteUser);

router.put('/', usersController.updateUser);


module.exports = router;