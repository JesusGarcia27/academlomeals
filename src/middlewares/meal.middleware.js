const Meal = require('../models/meals.models');
const Restaurant = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });
  if (!meal) {
    return next(new AppError(`The meal whit id: ${id} was not found ‼️`, 404));
  }
  req.meal = meal;
  next();
});
