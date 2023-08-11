const { AppError } = require('./errorHandler');
const { HTTP_BAD_REQUEST } = require('./httpStatusCodes');
const { logger } = require('./logger');

module.exports.requestBodyValidator = (schema) => (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody || Object.keys(reqBody).length === 0) {
    logger.error('Request body is missing');
    new AppError('Request body missing', HTTP_BAD_REQUEST);
  }

  const { error } = schema.validate(reqBody);

  if (error) {
    res.logger.error('Request body is invalid', error);
    new AppError('Request body is invalid', HTTP_BAD_REQUEST);
  }

  next();
};