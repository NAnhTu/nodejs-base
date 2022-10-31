const models = require('../../models/index')
let model = {
  getUser: async (email) => {
    return await models.users.findOne({
      attributes: ['code', 'name', 'email', 'avatar', 'role', 'password'],
      where: {
        email: email,
      },
      raw: true,
    })
  },
  createUser: async (user) => {
    return models.users.create(user)
  },
  update: async (params, user_code) => {
    return await models.users.update(params,
      {
        where: {
          code: user_code
        },
        raw: true
      }
    )
  }
}

module.exports = model
