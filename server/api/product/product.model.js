const
  conn = require('../../conn'),
  Category = require('../category/category.model.js')

const Product = conn.define('product', {
  title: {
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
    defaultValue: ['/assets/images/missingImg.png']
  }
}, {
  // The default scope below does not work.
  // I hoped that with this I can avoid include Category everywhere
  // defaultScope: {
  //   include: [ Category ]
  // },

  // This validation needs to be realized somewhere esle. Stupidest thing ever

  // validate: {
  //   hasCategory () {
  //     if (!this.categories || this.categories.length < 1) {
  //       throw new Error('Product must have at least one category.')
  //     }
  //   }
  // }
});

Product.search = function (str) {
  return this.findAll({
    where: { name: { $like: `%${str}%`, inventory: { $gt: 0 } },
    order: ['name']
    }
  })
}

module.exports = Product
