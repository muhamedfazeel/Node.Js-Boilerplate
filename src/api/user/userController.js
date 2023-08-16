const {
  HTTP_OK,
  HTTP_CREATED
} = require('../../utils/httpStatusCodes');
const { CREATED_MESSAGE, UPDATED_MESSAGE, DELETED_MESSAGE } = require('../../utils/responseMessages');
const userService = require('./userService');

exports.login = async (req, res) => {
  const {
    email,
    username,
    password
  } = req.body;
  const user = await userService.login(email, username, password);
  res.status(HTTP_OK).json(user);
};

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    username,
    password
  } = req.body;
  const userId = await userService
    .userSignup({
      name,
      email,
      username,
      password,
      user: req.userId
    });
  if (userId) {
    res.status(HTTP_CREATED).json({ message: CREATED_MESSAGE });
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