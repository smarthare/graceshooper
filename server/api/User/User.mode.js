const conn = require('../../conn')

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: conn.Sequelize.STRING,
  imgUrl: {
    type: conn.Sequelize.STRING,
    defaultValue: '',
    validate: {
      isUrl: true
    }
  },
  email: {
    type: conn.Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  isAdmin: {
    type: conn.Sequelize.STRING,
    defaultValue: false
  }
})

module.exports = User
