const router = require('express').Router();
const usernameRoutes = require('./username-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', usernameRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;