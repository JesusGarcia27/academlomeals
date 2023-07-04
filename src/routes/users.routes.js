const express = require('express');

//controladores
const userController = require('../controllers/users.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.validateUser,
  userController.createUser
);

router.post(
  '/login',
  validationMiddleware.validateUpdate,
  userController.login
);

router.use(authMiddleware.protect);

router.get(
  '/orders/:id',
  userMiddleware.validateSession,
  userController.ordersUser
);

router.get(
  '/orders/:id',
  userMiddleware.validateSession,
  userController.orderById
);

router
  .use('/:id', userMiddleware.userExist)
  .route('/:id')
  .patch(authMiddleware.protectAccountOwner, userController.updateUser)
  .delete(authMiddleware.protectAccountOwner, userController.deleteUser);

module.exports = router;
