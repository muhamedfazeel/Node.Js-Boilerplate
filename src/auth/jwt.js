const {
  sign,
  verify
} = require('jsonwebtoken');
const { SECRET } = require('../utils/constants');

module.exports.generateToken = (payload) => {
  return sign(payload, SECRET, { expiresIn: '15m' });
};

module.exports.verifyToken = (token) => {
  return verify(token, SECRET);
};
