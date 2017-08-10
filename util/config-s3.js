const AWS = require('aws-sdk');

const {
    BUCKET,
    BUCKET_SUBFOLDER,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env;

AWS.config.credentials.accessKeyId = AWS_ACCESS_KEY_ID;
AWS.config.credentials.secretAccessKey = AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3();

const listBucketObjects = s3.listObjects({
    Bucket: BUCKET
}).promise();

function getUrlArray(data) {
    const bucketUrlRoot = `https://s3.amazonaws.com/${BUCKET}${BUCKET_SUBFOLDER ? '/' + BUCKET_SUBFOLDER : ''}`;
    let urlArray = [];
    data.Contents.forEach(datum => {
        if (datum.Key.includes("mp3")) {
            urlArray.push(`${bucketUrlRoot}/${datum.Key}`)
        }
    });
    return urlArray;
}

module.exports = {
    listBucketObjects,
    getUrlArray
};
