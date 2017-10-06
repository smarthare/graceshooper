const conn = require('../../conn')

const CategoryProduct = conn.define('categoryproduct');

CategoryProduct.getAll = function() {
  return this.findAll({
  })
};

module.exports = CategoryProduct;
