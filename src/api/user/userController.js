const {
  HTTP_OK,
  HTTP_CREATED
} = require('../../utils/httpStatusCodes');
const { USER_CREATED_MESSAGE } = require('../../utils/responseMessages');
const userService = require('./userService');

exports.login = async (req, res, next) => {
  const {
    email,
    username,
    password
  } = req.body;
  const user = await userService.login(email, username, password);
  res.status(HTTP_OK).json(user);
};

exports.registerUser = async (req, res, next) => {
  const {
    name,
    email,
    username,
    password,
    confirmPassword
  } = req.body;
  const userId = await userService
    .userSignup(
      name,
      email,
      username,
      password,
      confirmPassword
    );
  if (userId) {
    res.status(HTTP_CREATED).json({ message: USER_CREATED_MESSAGE });
  }
};