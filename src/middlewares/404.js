const { logger } = require('../utils/logger');
const AppError = require('../utils/errorHandler');
const { HTTP_NOT_FOUND } = require('../utils/httpStatusCodes');

module.exports.error404 = (req, res, next) => {
    logger.warn('Endpoint not defined', {
        status: HTTP_NOT_FOUND,
        url: req.url,
    });
    const error = new AppError('Not Found', HTTP_NOT_FOUND);
    next(error);
};
