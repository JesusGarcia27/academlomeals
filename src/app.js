const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const userRoutes = require('./routes/users.routes');
const restaurantsRoutes = require('./routes/restaurants.routes');
const ordersRoutes = require('./routes/orders.routes');
const mealsRoutes = require('./routes/meals.routes');

const app = express();

const routes = {
  users: '/api/v1/users',
  restaurants: '/api/v1/restaurants',
  orders: '/api/v1/orders',
  meals: '/api/v1/meals',
};

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

app.use(routes.users, userRoutes);
app.use(routes.restaurants, restaurantsRoutes);
app.use(routes.orders, ordersRoutes);
app.use(routes.meals, mealsRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💥 `, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
