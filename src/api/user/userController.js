const userService = require('./userService');
const { logger } = require('../../utils/logger');
const { HTTP_OK, HTTP_CREATED } = require('../../utils/httpStatusCodes');
const { CREATED_MESSAGE, UPDATED_MESSAGE, DELETED_MESSAGE } = require('../../utils/responseMessages');

exports.login = async (req, res, next) => {
  const {
    email,
    username,
    password
  } = req.body;
  try {
    const response = await userService.login(email, username, password);
    if (response?.error) {
      throw response.error;
    }
    res.status(HTTP_OK).json({ message: 'Logged in successfully', data: response });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  const {
    name,
    email,
    username,
    password
  } = req.body;

  try {
    const response = await userService
      .userSignup({
        name,
        email,
        username,
        password
      });
    if (response?.userId) {
      res.status(HTTP_CREATED).json({ message: CREATED_MESSAGE });
    }
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await userService.fetchAllUsers;
  res.status(HTTP_OK).json(users);
};

exports.getUserById = async (req, res) => {
  const { userId } = req.param;
  const user = await userService.fetchUserById(userId);
  res.status(HTTP_OK).json(user);
};

exports.updateUser = async (req, res) => {
  const { userId } = req.param;
  const {
    name,
    email,
    password,
    roles
  } = req.body;
  await userService.updateUser({
    name,
    email,
    password,
    roles,
    user: req.userId,
    userId
  });

  res.status(HTTP_OK).json({ message: UPDATED_MESSAGE });
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.param;
  await userService.deleteUser(userId);

  res.status(HTTP_OK).json({ message: DELETED_MESSAGE });
};