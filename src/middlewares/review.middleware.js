const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.models');
const AppError = require('../utils/appError');
const User = require('../models/users.models');

exports.existReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      status: true,
      id,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review)
    return next(new AppError(`Review with id: ${id} not found`, 404));

  req.review = review;
  req.user = review.user;
  next();
});
