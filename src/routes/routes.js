const router = require('express').Router();
const statusRouter = require('../api/status/statusRoute');

router.use('/status', statusRouter);

// TODO: Implement other routes

module.exports = router;
