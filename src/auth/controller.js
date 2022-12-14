const userModel = require('../users/model')
const passwordHelper = require('../../helper/hash-password')
const generate = require('generate-password')
const status = require('http-status')
const jwtHelper = require("../../helper/jwt.helper");


let controller = {
  signUp: async (req, res) => {
    try {
      const {name, email, password} = req.body
      const user = await userModel.getByEmail(email);
      if (!user) {
        const hashPassword = await passwordHelper.generate(password);
        let code = generate.generate({
          length: 6,
          numbers: true,
        })
        let data = {
          code, name, email,
          password: hashPassword
        }
        let createUser;
        createUser = await userModel.createUser(data);
        if (!createUser) {
          return res
            .status(status.BAD_REQUEST)
            .send({
              message: 'error500'
            });
        }
        return res.status(status.CREATED).send({name});
      } else {
        res.status(status.BAD_REQUEST).send({
          message: 'userExisted'
        });
      }
    } catch (e) {
      console.log(e);
      res.status(status.INTERNAL_SERVER_ERROR).json(e)
    }
  },

  signIn: async (req, res) => {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;
      const user = await userModel.getByEmail(email);

      if (!user) return res.status(status.BAD_REQUEST)
        .send({
          message: 'userNotExist'
        });

      const isPasswordValid = passwordHelper.compare(password, user.password);

      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(status.BAD_REQUEST).send({
          message: 'incorrectPassword'
        });
      }

      const accessToken = await jwtHelper.generateToken(user, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);
      let refreshToken = user['refresh-token'];

      if (!refreshToken) refreshToken = await jwtHelper.generateToken(user, process.env.ACCESS_TOKEN_SECRET, '365d');

      return res.status(status.OK).json({accessToken, refreshToken});
    } catch (e) {
      console.log(e);
      res.status(status.INTERNAL_SERVER_ERROR).json(e);
    }
  },

  refreshToken: async (req, res) => {
    try {
      // L???y access token t??? header
      const bearerHeader = req.headers['authorization'];
      if (!bearerHeader) {
        return res.status(status.BAD_REQUEST).send('Kh??ng t??m th???y access token.');
      }
      const bearer = bearerHeader.split(' ')[1];

      // L???y refresh token t??? body
      const refreshTokenFromBody = req.body.refreshToken;
      if (!refreshTokenFromBody) {
        return res.status(status.BAD_REQUEST).send('Kh??ng t??m th???y refresh token.');
      }

      // Decode access token ????
      const decoded = await jwtHelper.decodeToken(bearer, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);
      if (!decoded) {
        return res.status(status.BAD_REQUEST).send('Access token kh??ng h???p l???.');
      }

      const email = decoded.data.email; // L???y username t??? payload

      const user = await userModel.getByEmail(email);
      if (!user) {
        return res.status(status.BAD_REQUEST).send('User kh??ng t???n t???i.');
      }

      // if (refreshTokenFromBody !== user.refreshToken) {
      //     return res.status(400).send('Refresh token kh??ng h???p l???.');
      // }

      const accessToken = await jwtHelper.generateToken(user, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);

      if (!accessToken) {
        return res
          .status(status.BAD_REQUEST)
          .send('T???o access token kh??ng th??nh c??ng, vui l??ng th??? l???i.');
      }
      return res.status(status.OK).json({accessToken});
    } catch (e) {
      console.log(e);
      res.status(status.INTERNAL_SERVER_ERROR).json(e);
    }
  },

  signOut: async (req, res) => {

  }
}

module.exports = controller
