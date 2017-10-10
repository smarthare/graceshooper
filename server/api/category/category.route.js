const router = require("express").Router(),
  Category = require("./category.model");

router
  .get("/", (req, res, next) => {
    Category.findAll({ order: ["id"] })
      .then(categories => res.send(categories))
      .catch(next);
  })
  .post("/:name", (req, res, next) => {
    console.log(req.params.name);
    Category.create({
      name: req.params.name
    })
      .then(category => res.send(category))
      .catch(next);
  })
  .put("/:id", (req, res, next) => {
    Category.findById(req.params.id)
      .then(category => category.update(req.body))
      .then(res.json)
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    console.log("category id", req.params.id);
    Category.findById(req.params.id)
      .then(category => category.destroy())
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
