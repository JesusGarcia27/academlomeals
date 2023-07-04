const catchAsync = require('../utils/catchAsync');
const Restaurants = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const Meal = require('../models/meals.models');

exports.existRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const restaurants = await Restaurants.findOne({
    where: {
      status: true,
      id: restaurantId || id,
    },
    include: [
      {
        model: Meal,
      },
    ],
  });

  if (!restaurants)
    return next(
      new AppError(`Restaurant with id: ${restaurantId || id} not found`, 404)
    );

  req.restaurants = restaurants;
  next();
});
