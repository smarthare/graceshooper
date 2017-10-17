const
  conn = require('../../conn'),
  Orders = require('../order/order.model')

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: `User${Math.floor(Math.random() * 99999)}`,
    validate: { notEmpty: true }
  },
  password: conn.Sequelize.STRING,
  imgUrl: {
    type: conn.Sequelize.STRING,
    defaultValue: 'default-photo.jpg'
  },
  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: conn.Sequelize.STRING,
    defaultValue: false
  },
  shipAddress: {
    type: conn.Sequelize.STRING,
    defaultValue: ''
  },
  shipCity: {
    type: conn.Sequelize.STRING,
    defaultValue: ''
  },
  shipState: {
    type: conn.Sequelize.STRING,
    defaultValue: ''
  },
  shipZip: {
    type: conn.Sequelize.STRING,
    defaultValue: ''
  },
  phone: {
    type: conn.Sequelize.STRING,
    defaultValue: ''
  }
})

const generateError = message => {
  const error = new Error(message)
  error.status = 401
  error.json = true
  return error
}

User.findBySessionId = function (userId) {
  if (!userId) throw generateError('no user found')
  return this.findById(userId, {include: Orders})
}

User.login = function (credentials) {
  if (!credentials.email || !credentials.password) {
    throw generateError('no credentials')
  }

  return this.findOne({ where: credentials, include: Orders }).then(user => {
    if (!user) throw generateError('bad credentials')
    return user
  })
}

User.signup = function (credentials) {
  if (!credentials.email || !credentials.password) {
    throw generateError('Missing info')
  }

  return this.create(credentials)
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw generateError('User already exists')
      }
    })
    .then(() => User.login(credentials))
    .catch(console.log)
}

module.exports = User
