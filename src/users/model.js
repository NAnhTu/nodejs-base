const models = require('../../models/index')
let model = {
  getUser: async (email) => {
    return await models.users.findOne({
      attributes: ['code', 'name', 'email', 'role', 'password'],
      where: {
        email: email,
      },
      raw: true,
    })
  },
  createUser: async (user) => {
    return models.users.create(user)
  },
}

module.exports = model
