const { decodePassword, compare, encrypt } = require('../../utils/crypto');
const userRepo = require('./userRepo');
const {
  generateToken
} = require('../../auth/jwt');
const { logger } = require('../../utils/logger');
const { AppError } = require('../../utils/errorHandler');
const { HTTP_UNAUTHORIZED, HTTP_EXPECTATION_FAILED } = require('../../utils/httpStatusCodes');
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

exports.userSignup = async ({ name, email, username, password, roles, user }) => {
  password = decodePassword(password);
  const encryptedPassword = encrypt(password);
  const userId = await userRepo.createNewUser({
    name,
    email,
    username,
    password: encryptedPassword,
    roles,
    user
  });
  if (userId) {
    return userId;
  } else {
    new AppError(
      'Failed to create new user',
      HTTP_EXPECTATION_FAILED
    );
  }
};

exports.fetchAllUsers = async () => {
  const users = await userRepo.fetchUsers();
  return users;
};

exports.fetchUserById = async (userId) => {
  const user = await userRepo.fetchUserById(userId);
  return user;
};

exports.updateUser = async ({ name, email, password, roles, user, userId }) => {
  password = password ? decodePassword(password) : password;
  const id = await userRepo.updateUser({
    name,
    email,
    password,
    roles,
    user,
    userId
  });
  if (id) {
    return id;
  } else {
    new AppError(
      'Failed to update the user',
      HTTP_EXPECTATION_FAILED
    );
  }
};

exports.deleteUser = async (userId) => {
  const row = await userRepo.deleteUser({
    userId
  });
  if (row) {
    return row;
  } else {
    new AppError(
      'Failed to update the user',
      HTTP_EXPECTATION_FAILED
    );
  }
};

const invalidUsernamePassword = () => {
  new AppError(
    INVALID_USERNAME_PASSWORD_ERR_MSG,
    HTTP_UNAUTHORIZED
  );
};