const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.models');
const AppError = require('../utils/appError');
const Orders = require('../models/orders.models.js');
const Meals = require('../models/meals.models');
const Restaurant = require('../models/restaurants.models');

exports.userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) return next(new AppError(`User with id: ${id} not found`, 404));

  req.user = user;
  next();
});

exports.validateSession = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const user = await User.findOne({
    where: {
      id: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Orders,
        include: [
          {
            model: Meals,
            include: [
              {
                model: Restaurant,
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    return next(new AppError(`User with id: ${id} not found`, 404));
  }
  req.user = user;
  next();
});
