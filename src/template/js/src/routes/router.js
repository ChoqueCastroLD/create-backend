const router = require('express').Router();

<% if(rest) { %>
// Users routes
<% if(aliases === true) { %>
router.use(require('@routes/user'));
<% } else { %>
router.use(require('./user'));
<% } } else { %>
// You can require and use your routes here ;)
<% } %>

module.exports = router;