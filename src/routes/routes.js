const router = require('express').Router();
const statusRouter = require('../api/status/route/statusRoutes');

router.use('/status', statusRouter);

module.exports = router;
