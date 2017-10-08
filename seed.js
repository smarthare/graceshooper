'use strict'

// Run 'node seed' or 'npm run seed' to seed user and products.
// There might be error messages giving on unique constraints, which should not cause any real problem

// At the moment, there is no data for order/reviews, as the logics for those still need work

const
  faker = require('faker'),
  Promise = require('bluebird'),
  db = require('./server/db'),
  models = db.models,
  numProducts = 100,
  numUsers = 50,
  Categories = ['Phone', 'Music Instruments', 'Books', 'Cool Stuff']

function doTimes (n, fn) {
  var results = []
  while (n--) results.push(fn())
  return results
}

function randUser () {
  return models.User.build({
    name: faker.name.findName(),
    password: faker.internet.password(),
    imgUrl: faker.internet.avatar(),
    email: faker.internet.email(),
    isAdmin: false
  })
}

function randProduct () {
  return Promise.map(
        Array(...Array(faker.random.number(2) + 1)).map(() => faker.random.number(3) + 1),
        catId => models.Category.findById(catId)
      )
      .then(categories => {
        return models.Product.create({
          title: faker.commerce.productName(),
          description: faker.company.bs(),
          price: faker.commerce.price(),
          inventory: faker.random.number(9999),
          imgUrls: [ faker.image.cats() ],
          categories: categories
        }, {
          include: [ models.Category ]
        })
      })
}

function generateUsers () {
  var users = doTimes(numUsers, randUser)
  users.push(models.User.build({
    name: 'AJ Frank',
    password: faker.internet.password(),
    imgUrl: 'https://sendgrid.com/wp-content/uploads/2017/07/Headshot-178x178.jpg',
    email: 'alexanderjfrank@gmail.com',
    isAdmin: true
  }))

  users.push(models.User.build({
    name: 'Vince Rios',
    password: faker.internet.password(),
    imgUrl: faker.internet.avatar(),
    email: 'vincr@graceshopper.com',
    isAdmin: true
  }))

  users.push(models.User.build({
    name: 'D Fan',
    password: faker.internet.password(),
    imgUrl: faker.internet.avatar(),
    email: 'dfan@graceshopper.com',
    isAdmin: true
  }))

  return users
}

function generateProducts () {
  return doTimes(numProducts, randProduct)
}

function generateCategories () {
  return Categories.map(cat => models.Category.build({name: cat}))
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save())
}

function createCategories () {
  return Promise.map(generateCategories(), category => category.save())
}

function createProducts () {
  return Promise.all(generateProducts())
}

const seed = () => createUsers()
  .then(() => createCategories())
  .then(() => createProducts())

console.log('Syncing database')

db.sync()
.then(() => {
  console.log('Seeding database')
  return seed()
})
.then(() => {
  console.log('Seeding successful')
})
.catch(err => {
  console.error('Error while seeding')
  console.error(err.errors)
})
