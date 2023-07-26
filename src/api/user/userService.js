const { decodePassword, compare, encrypt } = require('../../utils/crypto');
const userRepo = require('./userRepo');
const {
  generateToken
} = require('../../auth/jwt');
const { logger } = require('../../utils/logger');
const { AppError } = require('../../utils/errorHandler');
const { HTTP_UNAUTHORIZED, HTTP_BAD_REQUEST, HTTP_EXPECTATION_FAILED } = require('../../utils/httpStatusCodes');
const { INVALID_USERNAME_PASSWORD_ERR_MSG } = require('../../utils/responseMessages');

exports.login = async (email, username, password) => {
  try {
    const user = await userRepo.getUserByUsernameOrEmail(email, username);
    if (user) {
      password = decodePassword(password);
      const isValid = compare(password, user.password);
      if (isValid) {
        const token = generateToken({
          username,
          name: user.name,
          userId: user.id
        });
        logger.info(
          `Token for the user: ${user.username}`,
          token
        );
      } else {
        invalidUsernamePassword();
      }
    } else {
      invalidUsernamePassword();
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

exports.userSignup = async (name, email, username, password, confirmPassword, roles) => {
  if (password != confirmPassword) {
    new AppError('Passwords not matched', HTTP_BAD_REQUEST);
  } else {
    password = decodePassword(password);
    const encryptedPassword = encrypt(password);
    const userId = await userRepo.createNewUser(
      name,
      email,
      username,
      encryptedPassword,
      roles
    );
    if (userId) {
      return userId;
    } else {
      new AppError(
        'Failed to create new user',
        HTTP_EXPECTATION_FAILED
      );
    }
  }
};

const invalidUsernamePassword = () => {
  new AppError(
    INVALID_USERNAME_PASSWORD_ERR_MSG,
    HTTP_UNAUTHORIZED
  );
};