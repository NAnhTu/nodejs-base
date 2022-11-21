const {user} = require('../../models/index')
let model = {
  getByEmail: async (email) => {
    return await user.findOne({
      attributes: ['code', 'name', 'email', 'avatar', 'role', 'password'],
      where: {
        email: email,
      },
      raw: true,
    })
  },
  getByName: async (name) => {
    return await user.findOne({
      attributes: ['code', 'name', 'email', 'avatar'],
      where: {
        name: name,
      },
      raw: true,
    })
  },
  createUser: async (params) => {
    return user.create(params)
  },
  update: async (params, user_code) => {
    return user.update(params,
        {
          where: {
            code: user_code
          },
          raw: true
        }
    );
  }
}

module.exports = model
