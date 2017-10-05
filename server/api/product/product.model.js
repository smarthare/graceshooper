const conn = require('../../conn')

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: conn.Sequelize.TEXT,
    defaultValue: 'Awesome product!'
  },
  price: {
    type: conn.Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  imgUrls: {
    type: conn.Sequelize.ARRAY(conn.Sequelize.STRING),
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product
