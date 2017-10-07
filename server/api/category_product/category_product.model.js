const conn = require('../../conn');

const CategoryProduct = conn.define('categoryproduct');

CategoryProduct.getAll = function() {
  return this.findAll()
};

CategoryProduct.getCatById = function(id) {
  return this.findAll({ where: { categoryId: id } })
};

CategoryProduct.getProdById = function(id) {
  return this.findAll({ where: { productId: id } })
};

module.exports = CategoryProduct;
