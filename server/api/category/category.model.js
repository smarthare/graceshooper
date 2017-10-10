const conn = require('../../conn');
const Product = require( '../product/product.model' );
const Review = require( '../review/review.model' );

const defineAttr = {
  name: {
    type: conn.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      caseCheck: function(nameValue) {
        let first = nameValue.charAt(0);
        if (first !== first.toUpperCase()) {
          throw new Error('Category names should be capitalized');
        }
      }
    }
  }

};

const defineOptions = {};

const Category = conn.define('category', defineAttr, defineOptions);

Category.getAll = function() {
  return this.findAll({ order: ['name'] });
};

Category.getCatById = function(id) {
  id = id * 1;
  return this.findById(id, {
    include: [{
      model: Product,
      include: [Review]
    }]
  });
};

Category.getCatByIdTerm = function(id, term) {
  id = id * 1;
  return this.findById(id, {
    include: [{
      model: Product,
      where: { name: { $like: `%${ term }%`, inventory: { $gt: 0 } } },
      include: [Review]
    }]
  });
};

  //-------- using methods above this line --------------

Category.addCategory = function(name) {
  return this.create({ name });
};

Category.addCatProd = function(id, prod){
  id = id * 1;
  let product;
  // first add the product to the Product table
  Product.addProduct(prod)
  // then add the association (category & product)
    .then(_product => {
      product = _product;
      return this.findById(id)
    })
    .then(category => {
      return category.addProduct(product.id)
    });
};

Category.deleteCat = function(id) {
  id = id * 1;
  return this.destroy({ where: { id } })
    .then(() => { console.log(`Category deleted, id: ${id}`) })
};

module.exports = Category
