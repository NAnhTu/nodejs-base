const userModel = require('../users/model')
const jwtHelper = require('../../helper/jwt.helper')
const status = require('http-status')

let isAuth = async (req, res, next) => {
  try {
    // Lấy access token từ header
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
      return res.status(status.BAD_REQUEST).send({
        message: 'error'
      })
    }
    const bearer = bearerHeader.split(' ')[1]
    const verified = await jwtHelper.verifyToken(
      bearer,
      process.env.ACCESS_TOKEN_SECRET
    )
    if (!verified) {
      return res
        .status(status.UNAUTHORIZED)
        .send({
          message: '401'
        })
    }

    req.user = await userModel.getByEmail(verified.data.email)

    return next()
  } catch (e) {
    res
      .status(
        e.message === 'jwt expired'
          ? status.UNAUTHORIZED
          : status.INTERNAL_SERVER_ERROR
      )
      .send(e)
  }
}

module.exports = {
  isAuth,
}
