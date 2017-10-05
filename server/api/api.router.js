
const
  router = require('express').Router(),
  User = require('./user/user.model')

router
  .post('/login')
  .post('/logout')

  .use('/orders', require('/order/order.route'))
  .use('/products', require('/product/product.route'))
  .use('/categories', require('/category/category.route'))
  .use('/users', require('/user/user.route'))

module.exports = router
