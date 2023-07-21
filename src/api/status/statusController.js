const { HTTP_OK } = require('../../utils/httpStatusCodes');
const { getStatusService } = require('./statusService');

exports.getStatusController = async (req, res, next) => {
    const status = getStatusService();
    res.status(HTTP_OK).json(status);
};
