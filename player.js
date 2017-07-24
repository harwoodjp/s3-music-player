const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const myBucket = 'harwoodjp-private-music';

const bucketUrlRoot = `https://s3.amazonaws.com/${myBucket}`;

function listBucketObjects() {
	s3.listObjects({
		Bucket: myBucket	
	}, (err, data) => {
		if(err)throw err;
		console.log(data)
		return data;
	});
}


module.exports = {
	listBucketObjects
};
