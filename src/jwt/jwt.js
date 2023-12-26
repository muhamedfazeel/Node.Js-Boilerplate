const { sign, verify } = require('jsonwebtoken');
const config = require('../config/config');

module.exports.generateToken = (payload) => {
  return sign(payload, config.secret, { expiresIn: '15m' });
};

module.exports.verifyToken = (token) => {
  return verify(token, config.secret);
};
