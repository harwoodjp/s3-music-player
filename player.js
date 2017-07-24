const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const myBucket = 'harwoodjp-private-music';

const bucketUrlRoot = `https://s3.amazonaws.com/${myBucket}`;


const listBucketObjects = s3.listObjects({
	Bucket: myBucket
}).promise();

function getUrlArray(data) {
	let urlArray = [];
	data.Contents.forEach(datum => {
		urlArray.push(datum.Key)
	});
	return urlArray;
}


module.exports = {
	listBucketObjects,
	getUrlArray
};
