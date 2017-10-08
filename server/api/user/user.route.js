const router = require("express").Router(),
  User = require("./user.model");

router
  .get("/", (req, res, next) => {
    User.findAll({ order: ["id"] })
      .then(result => res.send(result))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    User.create(req.body)
      .then(result => res.send(result))
      .catch(next);
  })
  .put("/:id", (req, res, next) => {
    User.findById(req.params.id)
      .then(user => user.update(req.body))
      .then(res.json)
      .catch(next);
  })
  .delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
      .then(user => user.destroy())
      .then(res.json)
      .catch(next);
  });

module.exports = router;
