const User = require('../models/users.models');
const Meal = require('./meals.models');
const Order = require('./orders.models');
const Restaurant = require('./restaurants.models');
const Review = require('./reviews.models');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
