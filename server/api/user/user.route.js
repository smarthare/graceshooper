const router = require("express").Router(),
  User = require("./user.model");

router
  .get("/", (req, res, next) => {
    User.findAll({ order: ["name"], attributes: { exclude: ['password'] } })
      .then(users => res.send(users))
      .catch(next);
  })

  .post("/", (req, res, next) => {
    User.create(req.body)
      .then(user => res.send(user))
      .catch(next);
  })

  .put("/:id", (req, res, next) => {
    User.findById(req.params.id)
      .then(user => user.update(req.body))
      .then(user => res.send(user))
      .catch(next);
  })

  .delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
      .then(user => user.destroy())
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
