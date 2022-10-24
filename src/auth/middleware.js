const userModel = require('../users/model')
const jwtHelper = require('../../helper/jwt.helper')
const status = require('http-status')

let isAuth = async (req, res, next) => {
  try {
    // Lấy access token từ header
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
      return res.status(status.BAD_REQUEST).send('Không tìm thấy access token!')
    }
    const bearer = bearerHeader.split(' ')[1]
    const verified = await jwtHelper.verifyToken(
      bearer,
      process.env.ACCESS_TOKEN_SECRET
    )
    if (!verified) {
      return res
        .status(status.UNAUTHORIZED)
        .send('Bạn không có quyền truy cập vào tính năng này!')
    }

    req.user = await userModel.getUser(verified.data.email)

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
