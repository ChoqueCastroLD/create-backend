const router = require('express').Router();

<% if(rest) { %>
// Users routes
router.use('/users', require('./userRoutes'));
<% } else { %>
// You can require and use your routes here ;)
<% } %>

module.exports = router;