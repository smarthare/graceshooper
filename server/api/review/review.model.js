const conn = require('../../conn')

const Review = conn.define('review', {
  title: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    defaultValue: 'No Title'
  },
  body: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [40, 4000]
    }
  }
})

Review.prototype.truncateBody = function (len) {
  this.subject = `${this.subject.slice(0, len)}...`
  return this
}

module.exports = Review
