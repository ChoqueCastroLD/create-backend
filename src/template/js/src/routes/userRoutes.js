const express = require('express');
const router = express.Router();

<% if(aliases === true) { %>
const userController = require('@controllers/userController.js');
<% } else { %>
const userController = require('../controllers/userController.js');
<% } %>


router.get('/:id', userController.getUserById);

router.get('/', userController.getUsers);

router.post('/', userController.newUser);

router.delete('/:id', userController.deleteUser);

router.put('/', userController.updateUser);


module.exports = router;