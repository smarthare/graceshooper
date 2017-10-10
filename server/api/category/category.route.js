const router = require("express").Router(),
  Category = require("./category.model");

router
  // Only get route needed:
  // Product should include its cat, and get Cat's product should be done at store
  .get("/", (req, res, next) => {
    Category.findAll({ order: ["name"] })
      .then(categories => res.send(categories))
      .catch(next);
  })
  .post("/:name", (req, res, next) => {
    Category.create({ name: req.params.name })
      .then(category => res.send(category))
      .catch(next);
  })
  .put("/:id", (req, res, next) => {
    Category.findById(req.params.id)
      .then(category => category.update(req.body))
      .then(category => res.send(category))
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    Category.findById(req.params.id)
      .then(category => category.destroy())
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
