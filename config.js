const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucket = process.env.BUCKET;

const listBucketObjects = s3.listObjects({
	Bucket: bucket
}).promise();

function getUrlArray(data) {
	const bucketUrlRoot = `https://s3.amazonaws.com/${bucket}`;	
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
