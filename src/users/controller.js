const status = require("http-status");
const jwtHelper = require("../../helper/jwt.helper");
const userModel = require("./model");
const fs = require("fs")
const {uploadFile} = require('../../helper/aws.helper')

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

            const user = await userModel.getByEmail(email);
            if (!user) {
                return res.status(status.BAD_REQUEST).send({message: 'error'});
            }
            delete user.password
            return res.status(status.OK).json(Object.assign(user, {token: bearer}));
        } catch (e) {
            res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    },

    getUserByName: async (req, res) => {
        try {
            const {name} = req.query
            console.log(name);
            let users = await userModel.getByName(name)
            return res.status(status.OK).json(users)
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    },

    update: async (req, res) => {
        try {
            const {user_code} = req.params
            const {name} = req.body
            let params = {
                name
            }
            if (req.file) {
                let {originalname, fileName, path} = req.file
                if(!fileName){
                    fileName = originalname;
                }
                const key = `meeting-1206/${fileName}`;
                let data= fs.readFileSync(path);
                const s3FileURL = process.env.AWS_S3_IMAGE + key;
                await uploadFile(process.env.AWS_S3_IMAGE_BUCKET, key, data);
                params.avatar = s3FileURL
            }
            await userModel.update(params, user_code)
            return res.status(status.OK).json({message: 'success'})
        } catch (e) {
            return res.status(status.INTERNAL_SERVER_ERROR).json(e);
        }
    }
}

module.exports = controller
