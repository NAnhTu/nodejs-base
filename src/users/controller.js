const status = require("http-status");
const jwtHelper = require("../../helper/jwt.helper");
const userModel = require("./model");

let controller = {
    checkToken: async (req, res) => {
        try {
            // Lấy access token từ header
            const bearerHeader = req.headers['authorization'];
            if (!bearerHeader) {
                return res.status(status.BAD_REQUEST).send({message: 'error'});
            }
            const bearer = bearerHeader.split(' ')[1];

            // Decode access token đó
            const decoded = await jwtHelper.decodeToken(bearer, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) {
                return res.status(status.BAD_REQUEST).send({message: 'error'});
            }

            const email = decoded.data.email; // Lấy username từ payload

            const user = await userModel.getUser(email);
            if (!user) {
                return res.status(status.BAD_REQUEST).send({message: 'error'});
            }
            return res.status(status.OK).json(Object.assign(user, {token: bearer}));
        } catch (e) {
            res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    },
}

module.exports = controller
