const express = require('express');

const mealsControllers = require('../controllers/meals.controller');

const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurants.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');

const router = express.Router();

router.get('/', mealsControllers.findMeals);

router.post(
  '/:id',
  authMiddleware.protect,
  authMiddleware.restrictTo('admin'),
  validationMiddleware.mealValidation,
  restaurantMiddleware.existRestaurant,
  mealsControllers.createMeal
);

router
  .use('/:id', mealMiddleware.validMeal)
  .route('/:id')
  .get(mealsControllers.findMealById)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealsControllers.updateMeal
  )

  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealsControllers.deleteMeals
  );

module.exports = router;
