const {
  hashSync,
  compareSync
} = require('bcrypt');
const { SALT_ROUNDS } = require('./constants');
const { HTTP_BAD_REQUEST } = require('./httpStatusCodes');
const { AppError } = require('./errorHandler');
const { logger } = require('./logger');

module.exports.encrypt = (password) => {
  return hashSync(password, SALT_ROUNDS);
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
    new AppError(
      'Invalid string provided',
      HTTP_BAD_REQUEST
    );
  }
};
