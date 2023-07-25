const router = require('express').Router();
const statusRouter = require('../api/status/statusRoutes');
const userRouter = require('../api/user/userRoutes');

// Status Route
router.use('/status', statusRouter);

// User routes
router.use('/user', userRouter);

// TODO: Implement other routes

module.exports = router;
