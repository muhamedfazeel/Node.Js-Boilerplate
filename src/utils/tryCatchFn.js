const { logger } = require('./logger');
const { DEFAULT_ERR_MSG } = require('./constants');
const AppError = require('./errorHandler');

module.exports.withTryCatch = async (fn) => {
    try {
        const result = await fn();
        return result;
    } catch (error) {
        logger.error(DEFAULT_ERR_MSG, error);
        throw new AppError('Unexpected Error');
    }
};
