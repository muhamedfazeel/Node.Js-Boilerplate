const router = require('express').Router();
const statusRouter = require('../api/status/route/statusRoutes');

router.use('/status', statusRouter);

// TODO: Implement other routes

module.exports = router;
