const { HTTP_OK } = require('../../utils/httpStatusCodes');
const statusService = require('./statusService');

exports.getStatus = async (req, res, next) => {
    const status = await statusService.getStatus();
    res.status(HTTP_OK).json(status);
};
