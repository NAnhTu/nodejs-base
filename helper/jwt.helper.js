const jwt = require("jsonwebtoken");

let generateToken = (data, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {data},
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
};

let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};

let decodeToken = async (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, {ignoreExpiration: true}, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken,
};
