const conn = require('../../conn')

const LineItem = conn.define('lineitem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: conn.Sequelize.FLOAT,
  },
})

module.exports = LineItem
