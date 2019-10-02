const router = require('express').Router();


// Users routes
router.use('/users', require('./userRoutes'));


module.exports = router;