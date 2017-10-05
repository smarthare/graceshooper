const supertest = require('supertest')
process.env.SECRET = 'foo'
const app = supertest.agent(require('../server/app'))
const expect = require('chai').expect

describe('Authentication', () => {
  describe('logging out', () => {
    it('return 204', () => {
      return app.delete('/api/auth')
        .expect(204)
    })
  })
  describe('GET /api/auth', () => {
    it('return 401', () => {
      return app.get('/api/auth')
        .expect(401)
    })
  })
  describe('logging in', () => {
    describe('with bad credentials', () => {
      it('return 401 and a bad credentials message', () => {
        const credentials = {
          email: 'foo',
          password: 'bar'
        }
        return app.post('/api/auth')
          .send(credentials)
          .expect(401)
          .then(result => {
            const body = result.body
            const error = body.error
            expect(error.message).to.equal('bad credentials')
          })
      })
    })
    describe('without credentials', () => {
      it('return 401 and a no credentials message', () => {
        const credentials = {
        }
        return app.post('/api/auth')
          .send(credentials)
          .expect(401)
          .then(result => {
            const body = result.body
            const error = body.error
            expect(error.message).to.equal('no credentials')
          })
      })
    })
    describe('with successful credentials', () => {
      it('returns the user', () => {
        const credentials = {
          email: 'zeke@zeke.zeke',
          password: '123'
        }
        return app.post('/api/auth')
          .send(credentials)
          .expect(200)
          .then(result => {
            const body = result.body
            expect(body.email).to.equal(credentials.email)
            return app.get('/api/auth')
          })
          .then(result => {
            const body = result.body
            expect(body.email).to.equal(credentials.email)
          })
      })
    })
  })
})
