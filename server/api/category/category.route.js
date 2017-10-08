const router = require("express").Router(),
  Category = require("./category.model");

router
  .get("/", (req, res, next) => {
    Category.findAll({ order: ["id"] })
      .then(response => res.send(response))
      .catch(next);
  })
  .post("/:name", (req, res, next) => {
    console.log(req.params.name);
    Category.create({
      name: req.params.name
    })
      .then(response => res.send(response))
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
      .then(response => res.send(response))
      .catch(next);
  });

module.exports = router;
