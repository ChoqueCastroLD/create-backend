const router = require('express').Router();

<% if(rest) { %>
// Users routes
router.use('/users', require('./usersRoutes'));
<% } else { %>
// You can require and use your routes here ;)
<% } %>

module.exports = router;