const catchAsync = require('../utils/catchAsync');
const Order = require('../models/orders.models');
const Meal = require('../models/meals.models');
const AppError = require('../utils/appError');

exports.newOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id } = req.sessionUser;

  const meals = await Meal.findOne({
    where: {
      status: true,
      id: mealId,
    },
  });

  if (!meals) {
    return next(new AppError('That meal not exist', 404));
  }

  const price = meals.price * quantity;

  const order = await Order.create({
    mealId,
    quantity,
    price,
    userId: id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Your order has been created! ❇️',
    order,
    meals,
  });
});

exports.findOrdersUser = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const orders = await Order.findAll({ userId });
  return res.status(200).json({
    message: 'found orders',
    status: 'success',
    results: orders.length,
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id: orderId } = req.params;
  const order = await Order.update({ userId, orderId, next });

  return res.status(200).json({
    message: `order with id: ${order.id} completed`,
    status: 'success',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({ status: 'disabled' });

  return res.status(200).json({
    message: `order with id: ${order.id} deleted`,
    status: 'success',
  });
});
