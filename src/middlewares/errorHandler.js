const { INTERNAL_SERVER_ERROR_MSG } = require('../utils/constants');
const { AppError } = require('../utils/errorHandler');
const { HTTP_INTERNAL_SERVER_ERROR } = require('../utils/httpStatusCodes');

module.exports.errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        const { statusCode, status, message } = err;
        res.status(statusCode).json({ status, message });
    } else {
        const statusCode = err.status || HTTP_INTERNAL_SERVER_ERROR;
        const errorMessage = err.message || INTERNAL_SERVER_ERROR_MSG;
        res.status(statusCode).json({ status: 'error', message: errorMessage });
    }
};
