const router = require('express').Router();
const statusController = require('../controller/statusController');

router.get('/', statusController.getStatus);

module.exports = router;
