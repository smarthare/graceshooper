import db from '../server/db'
const { Product, Category, Order, LineItem, User, Review } = db.models
// import app from '../server'

import fs from 'fs-extra'
import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
const expect = chai.expect
import supertest from 'supertest'
import sinon from 'sinon'

describe('==== Sequelize Models ====', function () {
  beforeEach('Synchronize and clear database', () => db.sync())

  after('Synchronize and clear database', () => db.sync())
  describe('Product Model', () => {
    describe('definition', () => {
      it('must have title, description, price, and inventory quantity', () => {
        expect(Product.attributes.title).to.be.an('object')
        expect(Product.attributes.description).to.be.an('object')
        expect(Product.attributes.price).to.be.an('object')
        expect(Product.attributes.inventory).to.be.an('object')
        expect(Product.attributes.imgUrls).to.be.an('object')
      })
    })

    describe('validations', () => {
      it('must belong to at least one category', () => {
        return Product.create({ title: 'foo' })
          .catch(err => {
            expect(err).to.exist
            expect(err).to.be.an('error')
            expect(err.errors).to.contain.a.thing.with.properties({
              path: 'hasCategory',
              type: 'Validation error'
            })
          })
      })
      it('can have multiple categories', () => {
        const product = Product.build({
            id: 1,
            title: 'Chair',
            categories: [ { name: 'foo'}, { name: 'bar'} ]
          }, {
            include: [ Category ]
          })

        return product.validate()
          .then(result => result)
          .catch(err => {
            expect(err).to.not.exist
          })
      })
      it('throws an error when the only category of a product is removed', () => {
        let category
        return Category.create({ name: 'zii' })
          .then(_category => {
            category = _category
            return Product.create({
              title: 'zpp', categories: [ category ]
            })
          })
          .then(product => product.removeCategory(category))
          .catch(err => {
            expect(err).to.exist
            expect(err).to.be.an('error')
            expect(err.errors).to.contain.a.thing.with.properties({
              path: 'hasCategory',
              type: 'Validation error'
            })
          })
      })
      it('must create a placeholder photo, if there is no photo', () => {
        const product = Product.build({
            title: 'Chair',
            categories: [ { name: 'foo'}, { name: 'bar'} ]
          }, {
            include: [ Category ]
          })
        return product.validate()
          .then(product => expect(product.imgUrls.length > 0).to.be.true)
      })
    })
  })

  describe('User Model', () => {
    describe('definition', () => {
      it('must have name, password, email, isAdmin', () => {
        expect(User.attributes.name).to.be.an('object')
        expect(User.attributes.password).to.be.an('object')
        expect(User.attributes.email).to.be.an('object')
        expect(User.attributes.isAdmin).to.be.an('object')
      })
    })

    describe('validations', () => {
      it('must have a valid email address', () => {
        return User.create({ name: 'foo', email: 'foo@gg' })
          .catch(err => {
            expect(err).to.exist
            expect(err).to.be.an('error')
            expect(err.errors).to.contain.a.thing.with.properties({
              path: 'email',
              type: 'Validation error'
            })
          })
      })

      it('must have a unique email address', () => {
        return User
          .create({ name: 'foo', email: 'foo@123.com' })
          .then(user1 =>
            User.create({ name: 'fooz', email: 'foo@123.com' })
          )
          .catch(err => {
            expect(err).to.exist
            expect(err).to.be.an('error')
            expect(err.errors).to.contain.a.thing.with.properties({
              path: 'email',
              type: 'unique violation'
            })
          })
      })
    })
  })

  describe('Order Model', () => {
    let products, prof
    beforeEach('create seed products', () => {
      return Promise.all([
        Product.create({
          title: 'foo', categories: [{ name: '1'}], inventory: 10, price: 2.5
        }, {
          include: [ Category ]
        }),
        Product.create({
          title: 'bar', categories: [{ name: '2'}], inventory: 7, price: 48
        }, {
          include: [ Category ]
        }),
        Product.create({
          title: 'baz', categories: [{ name: '3'}], inventory: 2, price: 1234
        }, {
          include: [ Category ]
        })
      ])
      .then(_products => {
        products = _products
        return User.create({ name: 'fooa', email: 'fooa@123.com' })
      })
      .then(_user => {
        prof = _user;
        return prof
      })
    })

    after('clear variables', () => {
      products = null; prof = null
      return
    })

    describe('association', () => {
      it('must belong to a user', () => {
        return Order.create({ userId: prof.id })
          .then(order => {
            expect(order.userId).to.exist
          })
      })

      it('...or a guest session, where userId is null', () => {
        return Order.create()
          .then(order => {
            expect(order.userId).to.be.a('null')
          })
      })

      it('have line items that capture price, product id, and quantity', () => {
        return Order.addToCartOfUser(prof.id, products[0].id, 3)
          .then(lineItem => {
            expect(lineItem).to.exist
            expect(lineItem.price).to.be.a('null')
            expect(lineItem.productId).to.exist
            expect(lineItem.quantity).to.exist
          })
      })
    })

    describe('instance method - submit', () => {
      it('must be able to submit an order with correct info for correct user', () => {
        return Order.addToCartOfUser(prof.id, products[0].id, 4)
          .then(() => Order.addToCartOfUser(prof.id, products[1].id, 3))
          .then(() => Order.addToCartOfUser(prof.id, products[2].id, 2))
          .then(() => Order.getCartByUserId(prof.id))
          .then(cart => cart.submit())
          .then(order =>  Order.getOrdersByUserId(prof.id))
          .then(orders => {
            expect(orders.length).to.equal(1)
            expect(orders[0].lineItems.length).to.equal(3)
            expect(orders[0].lineItems[0].quantity).to.equal(4)
            expect(orders[0].lineItems[1].quantity).to.equal(3)
            expect(orders[0].lineItems[2].quantity).to.equal(2)
            expect(orders[0].lineItems[0].productId).to.equal(products[0].id)
            expect(orders[0].lineItems[1].productId).to.equal(products[1].id)
            expect(orders[0].lineItems[2].productId).to.equal(products[2].id)
          })
          .then(() => Product.findById(products[0].id)
            .then(product => {
              expect(product.inventory).to.equal(6)
            })
          )
      })
    })

    describe('functionality', () => {
      it('must be able to complete and keep price at the time of order', () => {
        return Order.addToCartOfUser(prof.id, products[0].id, 4)
          .then(() => Order.getCartByUserId(prof.id))
          .then(cart => cart.submit())
          .then(() => Product.findById(products[0].id, { include: [ Category ] }))
          .then(product => product.update({price: 9999}))
          .then(order => Order.getOrdersByUserId(prof.id))
          .then(orders => {
            expect(orders[0].lineItems[0].price).to.equal(2.5)
          })
      })
    })
  })

  describe('Review Model', () => {
    describe('association', () => {
      xit('must belong to a product', () => {
        expect(null).to.be.ok
      })

      xit('must belong to a user', () => {
        expect(null).to.be.ok
      })
    })

    describe('validatoins', () => {
      xit('must have at least 40 characters', () => {
        expect(null).to.be.ok
      })
    })
  })
})
