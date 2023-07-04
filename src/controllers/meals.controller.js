const Meal = require('../models/meals.models');
const Restaurant = require('../models/restaurants.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });
  return res.status(200).json({
    status: 'success',
    message: 'All meals have been found 🆗',
    results: meals.length,
    meals,
  });
});

exports.findMealById = catchAsync(async (req, res, next) => {
  const { id } = req;

  const meal = await Meal.findOne({
    id,
  });
  return res.status(200).json({
    message: 'The food has been found ✅',
    status: 'success',
    meal,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const { restaurant } = req;

  const mealFind = await Meal.findOne({
    where: {
      name,
    },
  });
  if (mealFind) {
    return next(new AppError('There is already a meal with this name 🫡', 404));
  }

  const meal = await Meal.create({
    name,
    price,
    restaurant: id,
  });
  res.status(200).json({
    status: 'success',
    message: 'You food has been created',
    meal: {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      restaurant: meal.restaurant,
    },
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updateMeal = await Meal.update({
    name,
    price,
  });
  return res.status(200).json({
    status: 'success',
    message: 'Your food has been updated 👌',
    updateMeal,
  });
});

exports.deleteMeals = catchAsync(async (rea, res, next) => {
  const { meal } = req;

  await Meal.update({
    status: 'disabled',
  });
  return res.status(200).json({
    status: 'success',
    message: 'The meal was deleted',
  });
});
