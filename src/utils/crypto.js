const {
  hashSync,
  compareSync
} = require('bcrypt');
const { HTTP_BAD_REQUEST, HTTP_EXPECTATION_FAILED } = require('./httpStatusCodes');
const { AppError } = require('./errorHandler');
const { logger } = require('./logger');
const { DEFAULT_ERR_MSG } = require('./responseMessages');
const config = require('../config/config');

module.exports.encrypt = (password) => {
  try {
    return hashSync(password, config.saltRounds);
  } catch (error) {
    logger.error(error.message || 'Hashing Failed', HTTP_EXPECTATION_FAILED);
    throw new AppError(DEFAULT_ERR_MSG, HTTP_EXPECTATION_FAILED);
  }
};

module.exports.compare = (password, hash) => {
  return compareSync(password, hash);
};

module.exports.decodePassword = async (encodedPassword) => {
  try {
    const decodedPassword = Buffer.from(encodedPassword, 'base64').toString('utf-8');
    return decodedPassword;
  } catch (error) {
    logger.error(error);
    throw new AppError(
      'Invalid string provided',
      HTTP_BAD_REQUEST
    );
  }
};
