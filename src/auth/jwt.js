const {
  sign,
  verify
} = require('jsonwebtoken');
const { SECRET } = require('../utils/constants');

module.exports.generateToken = (payload) => {
  return sign(payload, SECRET, { expiresIn: '2 days' });
};

module.exports.verifyToken = (token) => {
  return verify(token, SECRET);
};
