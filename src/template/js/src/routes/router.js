const router = require('express').Router();

<% if(rest) { %>
// Users routes
<% if(aliases === true) { %>
router.use(require('@routes/userRoutes'));
<% } else { %>
router.use(require('./userRoutes'));
<% } } else { %>
// You can require and use your routes here ;)
<% } %>

module.exports = router;