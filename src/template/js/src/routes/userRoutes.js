const express = require('express');
const router = express.Router();

<% if(aliases === true) { %>
const userController = require('@controllers/userController.js');
<% } else { %>
const userController = require('../controllers/userController.js');
<% } %>


router.get('/api/users/:id', userController.getUserById);

router.get('/api/users', userController.getUsers);

router.post('/api/users', userController.newUser);

router.delete('/users/:id', userController.deleteUser);

router.put('/api/users', userController.updateUser);


module.exports = router;