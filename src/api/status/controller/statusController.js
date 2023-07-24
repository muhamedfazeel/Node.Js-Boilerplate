const { HTTP_OK } = require('../../../utils/httpStatusCodes');
const { getStatusService } = require('../service/statusService');

exports.getStatus = async (req, res, next) => {
    const status = await getStatusService();
    res.status(HTTP_OK).json(status);
};
