const router = require('express').Router();
const userRoutes = require('./user-route');
const thoughtRoutes = require('./thought-route');

router.use('/User', userRoutes)
router.use('/Thought', thoughtRoutes)

module.exports = router;