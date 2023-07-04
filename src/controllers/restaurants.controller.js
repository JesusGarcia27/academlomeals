const Restaurant = require('../models/restaurants.models');
const catchAsync = require('../utils/catchAsync');

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: restaurants.length,
    message: 'All restaurants can find successfully ✅',
  });
});
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  await Restaurant.create({ name, address, rating });

  return res.status(201).json({
    status: 'success',
    message: 'The restaurant has been created! ✔️',
  });
});
exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurants } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant successfully 🆗',
    restaurants,
  });
});
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurants } = req;
  const { name, address } = req;

  await restaurants.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'The restaurant has been updated 👌',
  });
});
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurants } = req;

  await restaurants.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'The restaurant has been deleted 😭',
  });
});
