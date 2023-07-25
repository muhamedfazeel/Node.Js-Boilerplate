const {
  hashSync,
  compareSync
} = require('bcrypt');
const { AppError } = require('./errorHandler');
const { HTTP_BAD_REQUEST } = require('./httpStatusCodes');
const { logger } = require('./logger');
const { SALT_ROUNDS } = require('./constants');
const { withTryCatch } = require('./tryCatchFn');

const saltRounds = SALT_ROUNDS;

module.exports.encrypt = (password) => {
  return hashSync(password, saltRounds);
};

module.exports.compare = (password, hash) => {
  return compareSync(password, hash);
};

module.exports.decodePassword = withTryCatch(async (encodedPassword) => {
  const decodedPassword = Buffer.from(encodedPassword, 'base64').toString('utf-8');
  return decodedPassword;
},
  'Invalid string provided',
  HTTP_BAD_REQUEST
);