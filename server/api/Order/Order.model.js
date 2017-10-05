const
  conn = require('../../conn'),
  Product = require('../Product/Product.model'),
  LineItem = require('../LineItem/LineItem.model')

const Order = conn.define('order', {
  isCart: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: conn.Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  shippingAddress: {

  },
  billingAddress: {

  }
})

module.exports = Order
