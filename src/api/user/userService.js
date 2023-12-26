const { decodePassword, compare, encrypt } = require('../../utils/crypto');
const userRepo = require('./userRepo');
const {
  generateToken
} = require('../../jwt/jwt');
const { logger } = require('../../utils/logger');
const { AppError } = require('../../utils/errorHandler');
const { HTTP_UNAUTHORIZED, HTTP_EXPECTATION_FAILED } = require('../../utils/httpStatusCodes');
const { INVALID_USERNAME_PASSWORD_ERR_MSG, USER_ALREADY_EXISTS } = require('../../utils/responseMessages');

exports.login = async (email, username, password) => {
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
      return invalidUsernamePassword;
    }
  } else {
    return invalidUsernamePassword;
  }
};

exports.userSignup = async ({ name, email, username, password }) => {
  const user = await userRepo.getUserByUsernameOrEmail(username, email);
  if (user) {
    return {
      error: new AppError(
        USER_ALREADY_EXISTS,
        HTTP_EXPECTATION_FAILED
      )
    };
  }
  password = decodePassword(password);
  const encryptedPassword = encrypt(password);
  const userId = await userRepo.createNewUser({
    name,
    email,
    username,
    password: encryptedPassword,
  });
  if (userId) {
    return userId;
  } else {
    return {
      error: new AppError(
        'Failed to create new user',
        HTTP_EXPECTATION_FAILED
      )
    };
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
    throw new AppError(
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
    throw new AppError(
      'Failed to update the user',
      HTTP_EXPECTATION_FAILED
    );
  }
};

const invalidUsernamePassword = {
  error: new AppError(INVALID_USERNAME_PASSWORD_ERR_MSG, HTTP_UNAUTHORIZED)
};