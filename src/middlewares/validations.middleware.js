const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validateUser = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validFields,
];

exports.loginAccess = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validFields,
];

exports.validateUpdate = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];

exports.restaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a number between 1 and 5'),
  validFields,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('address').notEmpty().withMessage('Address cannot be empty.'),
  validFields,
];

exports.validationReview = [
  body('comment').notEmpty().withMessage('Comment cannot be empty.'),
];

exports.mealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty.'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty.')
    .isInt({ min: 1 })
    .withMessage('Price must be a number'),
  validFields,
];

exports.validateCreateOrder = [
  body('quantity')
    .notEmpty()
    .withMessage('quantity cannot be empty')
    .isInt()
    .withMessage('quantity must be a integer'),
  body('mealId')
    .notEmpty()
    .withMessage('mealId is require')
    .isInt()
    .withMessage('mealId must be a integer'),
  validFields,
];
