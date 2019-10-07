const router = require('express').Router();

<% if(rest) { %>
// Users routes
<% if(aliases === true) { %>
router.use('/users', require('@routes/userRoutes'));
<% } else { %>
router.use('/users', require('./userRoutes'));
<% } %>
<% } else { %>
// You can require and use your routes here ;)
<% } %>

module.exports = router;