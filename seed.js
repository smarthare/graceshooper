'use strict'
const db = require( './server/db' );
const models = db.models

const seed = () => {
  let categories;
  const promiseArr = [
    models.Category.create({ name: 'Electric Guitars' }),
    models.Category.create({ name: 'Acoustic Guitars' }),
    models.Category.create({ name: 'Guitar Amps' }),
    models.Category.create({ name: 'Synthesizers' }),
    models.Category.create({ name: 'Pianos' }),
    models.Category.create({ name: 'Violin Family' })
  ];
  Promise.all(promiseArr)
    .then(_categories => {
      categories = _categories;
      const promiseArr = [
        models.Product.create({ name: 'Gibson ES-339 Studio Semi-Hollow', description: 'This simple, elegant semi-hollow features 57 Classic and Super 57 Classic pickups with matched bobbin windings for vintage humbucker tone with enhanced highs. Appointments include a great-feeling C neck profile with torrified maple fretboard, an improved truss rod, rolled neck binding, low-profile frets, Grover tuners and locking stopbar tailpiece for better sustain. Includes hardshell case.', price: 1799.00, inventory: 3,
          imgURLs: [] }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
    //     models.Product.create({
    //       name: '',
    //       description: '',
    //       price: 0,
    //       inventory: 0,
    //       imgURLs: []
    //     }),
      ];
      return Promise.all(promiseArr)
    })
    .then(products => {
      categories[0].addProducts(products[0])
    })
}

module.exports = seed;
