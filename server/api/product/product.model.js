const conn = require('../../conn')

const defineAttr = {
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
};

const defineOptions = {};

const Product = conn.define('product', defineAttr, defineOptions);

Product.getAll = function() {
  return this.findAll({
    order: ['name']
  })
};

Product.getProdByID = function(id) {
  id = id * 1;
  return this.findById(id);
};

Product.addProduct = function(product){
    return this.create({
      name: product.name,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      imgUrls: product.imgUrls
    });
};

Product.deleteProd = function(id) {
  id = id * 1;
  return this.destroy({ where: { id } })
};

module.exports = Product
