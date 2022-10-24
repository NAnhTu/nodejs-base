const models = require('../../models/index')
let model = {
  getUser: async (email) => {
    return await models.users.findOne({
      attributes: ['name', 'email', 'password'],
      where: {
        email: email,
      },
      raw: true,
    })
  },
  createUser: async (user) => {
    return await models.users.create(user)
  },
}

module.exports = model