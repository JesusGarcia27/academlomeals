const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');

const User = require('../models/users.models');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { emai, password } = req.body;

  const user = await User.findOne({
    where: {
      email: emai.toLowerCase(),
      status: true,
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.ordersUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    results: user.orders.length,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    orders: user.orders,
    meals: user.meals,
    restaurants: user.restaurants,
  });
});

exports.orderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  const filteredOrder = user.orders.filter((order) => order.id === id);

  if (!filteredOrder) {
    return next(new AppError(`The order with id:${id} does not exist`));
  }

  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    order: filteredOrder,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: `The user with id:${user.id} was updated 💫`,
    user: {
      name,
      email,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: `User with id:${user.id} has been deleted 💨`,
  });
});
