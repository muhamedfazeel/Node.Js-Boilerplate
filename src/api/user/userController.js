const { HTTP_OK } = require('../../utils/httpStatusCodes');
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
  const user = await userService
    .userSignup(
      name,
      email,
      username,
      password,
      confirmPassword
    );
};