const router = require('express').Router();
const { getStatusController } = require('../api/status/statusController');

router.get('/status', getStatusController);

module.exports = router;
