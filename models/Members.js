const db = require('../db')

module.exports = db.defineModel('members', {
  email: {
    type: db.STRING(100),
    primaryKey: true
  },
  password: db.STRING(100),
  name: db.STRING(100),
  intro: db.STRING(255),
  avatar: db.STRING(255),
  filepath: db.STRING(255)
});