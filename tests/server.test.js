// process.on('unhandledRejection', function (reason, promise) {
//   console.log('==========\n\n', reason, '\n\n==========')
//   console.log('==========\n\n', promise, '\n\n==========')
// })

import { db, models } from '../server/db'
const { Product, Category, Order, LineItem, User, Review } = models
import app from '../server'

import fs from 'fs-extra'
import chai from 'chai'
import chaiProperties from 'chai-properties'
import chaiThings from 'chai-things'
chai.use(chaiProperties)
chai.use(chaiThings)
const expect = chai.expect
import supertest from 'supertest'
import sinon from 'sinon'

describe('==== Backend Tests ====', () => {
  beforeEach('Synchronize and clear database', () => db.sync({force: true}))

  after('Synchronize and clear database', () => db.sync({force: true}))

  describe('Sequelize Models', function () {
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
          const product = Product.build({ title: 'foo' })
          return product.validate()
            .then(() => { throw new Error('Promise should have rejected.') })
            .catch(err => {
              expect(err).to.exist
              expect(err).to.be.an('error')
              expect(err.errors).to.contain.a.thing.with.properties({
                path: 'category',
                type: 'notNull Violation'
              })
            })
        })
        it('must create a placeholder photom, if there is no photo', () => {

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

        it('must have a unique email address', () => {
        })
      })

      describe('validations', () => {
        it('must have a valid email address', () => {
        })

        it('must have a unique email address', () => {
        })
      })
    })

    describe('Order Model', () => {
      describe('association', () => {
        it('must belong to a user, or a guest session', () => {

        })

        it('must have line items that capture price, product id, and quantity', () => {
        })
      })

      describe('instance method', () => {
        it('must be able to submit an order with correct info', () => {
        })
        it('must be able to submit an order for correct user', () => {
        })
      })

      describe('functionality', () => {
        it('must be able to complete and keep price at the time of order', () => {
        })
      })
    })

    describe('Review Model', () => {
      describe('association', () => {
        it('must belong to a product', () => {

        })

        it('must belong to a user', () => {
        })
      })

      describe('validatoins', () => {
        it('must have at least 40 characters', () => {

        })
      })
    })
  })

  describe('API Routes', function () {

  })
})
