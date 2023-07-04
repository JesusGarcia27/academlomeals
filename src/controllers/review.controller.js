const Review = require('../models/reviews.models');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;

  const { id } = req.params;
  const uid = req.sessionUser.id;

  await Review.create({ comment, rating, restaurantId: +id, userId: +uid });

  return res.status(201).json({
    status: 'success',
    message: 'The review successfylly ❇️',
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.updateReview({ comment, rating });

  return res.status(200).json({
    status: 'success',
    message: 'The review has been updated ✅',
  });
});
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.updateReview({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'The review has been removed 😩',
  });
});
