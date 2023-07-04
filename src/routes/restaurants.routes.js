const express = require('express');

//controladores
const restaurantsController = require('../controllers/restaurants.controller');
const reviewController = require('../controllers/review.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurants.middleware');
const reviewMiddleware = require('../middlewares/review.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(restaurantsController.findAllRestaurants)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.restaurantValidation,
    restaurantsController.createRestaurant
  );

router
  .route('/:id')
  .get(
    restaurantMiddleware.existRestaurant,
    restaurantsController.findOneRestaurant
  )
  .patch(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantsController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.existRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantsController.deleteRestaurant
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.existRestaurant,
  reviewController.createReview,
  validationMiddleware.validationReview
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.existReview,
    restaurantMiddleware.existRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(
    validationMiddleware.validationReview,
    authMiddleware.protectAccountOwner,
    reviewController.updateReview
  )
  .delete(
    validationMiddleware.validationReview,
    authMiddleware.protectAccountOwner,
    reviewController.deleteReview
  );

module.exports = router;
