const conn = require('../../conn')

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    // Price to be submitted with order
    type: conn.Sequelize.FLOAT
  }
})

module.exports = LineItem
