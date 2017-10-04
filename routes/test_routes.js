const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// ***** Test Route *****

router.get('/', (req, res, next) => {
  models.Test.campusFindAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  models.Test.campusFindById(req.params.id)
    .then(campus => {
      res.send(campus);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  models.Test.create({
    name: req.body.name,
    photo: req.body.photo,
    phone: req.body.phone
  })
  .then(campus => {
    res.send(campus);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  console.log('in route: ', req.params.id)
  models.Test.findById(req.params.id * 1)
    .then(campus => {
      campus.name =  req.body.name;
      campus.photo = req.body.photo;
      campus.phone = req.body.phone;
      console.log('--------->', campus)
      return campus.save();
    })
  .then(campus => {
    res.send(campus);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  models.Test.campusRemove(req.params.id)
  res.sendStatus(204);
});

module.exports = router;
