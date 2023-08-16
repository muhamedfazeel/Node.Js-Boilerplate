const router = require('express').Router();
const { requestBodyValidator } = require('../../utils/validator');
const userController = require('./userController');
const { loginSchema, newUserSchema } = require('./userEntities');

router.post(
  '/login',
  requestBodyValidator(loginSchema),
  userController.login
);
router.post(
  'register',
  requestBodyValidator(newUserSchema),
  userController.registerUser
);
router.get(
  '/:userId',
  userController.getUserById
);
router.get(
  '/',
  userController.getAllUsers
);
router.patch(
  '/:userId',
  userController.updateUser
);
router.patch(
  '/:userId',
  userController.deleteUser
);

module.exports = router;