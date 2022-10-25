const status = require("http-status");
const jwtHelper = require("../../helper/jwt.helper");
const userModel = require("./model");

let controller = {
    checkToken: async (req, res) => {
        try {
            // Lấy access token từ header
            const bearerHeader = req.headers['authorization'];
            if (!bearerHeader) {
                return res.status(status.BAD_REQUEST).send('Không tìm thấy access token.');
            }
            const bearer = bearerHeader.split(' ')[1];

            // Decode access token đó
            const decoded = await jwtHelper.decodeToken(bearer, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            if (!decoded) {
                return res.status(status.BAD_REQUEST).send('Access token không hợp lệ.');
            }

            const email = decoded.data.email; // Lấy username từ payload

            const user = await userModel.getUser(email);
            if (!user) {
                return res.status(status.BAD_REQUEST).send('User không tồn tại.');
            }
            return res.status(status.OK).json({user});
        } catch (e) {
            console.log(e);
            res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    },
}

module.exports = controller
