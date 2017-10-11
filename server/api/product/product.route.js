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
    Product.create(req.body, { include: [Category] })
      .then(product => res.send(product))
      .catch(next);
  })
  .put("/:id", (req, res, next) => {
    Product.findById(req.params.id, { include: [Category] })
      .then(product => product.update(req.body))
      .then(product => res.send(product))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    Product.findById(req.params.id, { include: [Category] })
      .then(product => product.destroy())
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
