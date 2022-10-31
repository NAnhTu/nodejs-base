const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION
});

let awsS3Helper = {
    uploadFile: (bucket, path, data, callBack) => {
        return new Promise((resolve, reject) => {

            let param = {
                Bucket: bucket,
                Key: path,
            };

            param.Body = data;

            s3.putObject(param, function (err, data) {

                if (err) {
                    reject(err);
                } else {
                    resolve('Success!');
                }
            });
        }).then(() => {
            if (callBack) callBack();
        });
    },
}

module.exports = awsS3Helper;
