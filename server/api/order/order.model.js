const
  conn = require('../../conn'),
  Product = require('../product/product.model'),
  LineItem = require('./lineItem.model')

const Order = conn.define('order', {
  isCart: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: conn.Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  shippingAddress: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  billingAddress: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
