const router = require("express").Router(),
  Product = require("./product.model"),
  Category = require("../category/category.model.js"),
  Review = require("../review/review.model.js");

router
  .get("/", (req, res, next) => {
    Product.findAll({ order: ["title"], include: [Category] })
      .then(products => res.send(products))
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    Product.findById(req.params.id, { include: [Category] })
      .then(product => res.send(product))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    const { product, categories } = req.body;
    Promise.all(categories.map(category => Category.findById(category.id)))
      .then(cats => {
        console.log(product);
        return Product.create(
          {
            title: product.title,
            description: product.description,
            price: parseInt(product.price),
            inventory: parseInt(product.inventory),
            imgUrls: [product.imgUrls]
          },
          { include: [Category] }
        ).then(product => product.setCategories(cats));
      })
      .then(product => res.send(product))
      .catch(next);
  })
  .put("/:id", (req, res, next) => {
    const { product, categories } = req.body;
    Product.findById(req.params.id, { include: [Category] })
      .then(prod => prod.update(product))
      .then(p => {
        return Promise.all(
          categories.map(category => Category.findById(category.id))
        ).then(cats => p.setCategories(cats));
      })
      .then(result => res.send(result))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    Product.findById(req.params.id, { include: [Category] })
      .then(product => product.destroy())
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
