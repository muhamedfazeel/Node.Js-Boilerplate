const router = require('express').Router();
const statusController = require('./statusController');

router.get('/', statusController.getStatus);

module.exports = router;
