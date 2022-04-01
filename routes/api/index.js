const router = require('express').Router();
const usernameRoutes = require('./username-routes');

router.use('/users', usernameRoutes);

module.exports = router;