const Joi = require('joi');

module.exports.loginSchema = Joi.object({
  username: Joi.string().min(4).max(12),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20)
}).xor('username', 'email');

module.exports.newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(4).max(30).required(),
  username: Joi.string().min(4).max(12).required(),
  password: Joi.string().min(8).max(20).required(),
  roles: Joi.string().valid().default('')
});

module.exports.updateUserSchema = Joi.object({
  name: Joi.string().min(4).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).max(20).required()
});

module.exports.reqParam = Joi.object({
  userId: Joi.number().required()
});