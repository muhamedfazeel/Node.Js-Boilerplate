const { AppError } = require('./errorHandler');
const { HTTP_BAD_REQUEST } = require('./httpStatusCodes');
const { logger } = require('./logger');
const { MISSING_REQ_BODY, INVALID_REQ_BODY, MISSING_REQ_PARAM, INVALID_REQ_PARAM } = require('./responseMessages');

module.exports.requestBodyValidator = (schema) => (req, res, next) => {
  const reqBody = req.body;

  if (!reqBody || !Object.keys(reqBody).length) {
    logger.warn(MISSING_REQ_BODY);
    new AppError(MISSING_REQ_BODY, HTTP_BAD_REQUEST);
  }

  const { error } = schema.validate(reqBody);

  if (error) {
    res.logger.error(INVALID_REQ_BODY, error);
    new AppError(INVALID_REQ_BODY, HTTP_BAD_REQUEST);
  }

  next();
};

module.exports.requestParamValidator = (schema) => (req, res, next) => {
  const reqParam = req.param;

  if (!reqParam || !Object.keys(reqParam).length) {
    logger.warn(MISSING_REQ_PARAM);
    new AppError(MISSING_REQ_PARAM, HTTP_BAD_REQUEST);
  }

  const { error } = schema.validate(reqParam);

  if (error) {
    res.logger.error(INVALID_REQ_PARAM, error);
    new AppError(INVALID_REQ_PARAM, HTTP_BAD_REQUEST);
  }

  next();
};