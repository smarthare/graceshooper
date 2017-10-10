
const router = require('express').Router()

router
  .use('/orders', require('./order/order.route'))
  .use('/products', require('./product/product.route'))
  .use('/categories', require('./category/category.route'))
  .use('/users', require('./user/user.route'))
  .use('/auth', require('./auth/auth.route'))
  .use('/reviews', require('./review/review.route'))

module.exports = router;
