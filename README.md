## Set up
* Install and configure the AWS CLI
* Have an S3 bucket organized as follows -- `s3://[bucket-name]/[artists]/[albums]/[songs]`
* Clone project and `npm install`
* Create a file in the project root called `.env` and specify your bucket, e.g. `BUCKET=MyMusicBucket`
* Run `node index.js` and direct browser to `localhost:3000`

## `.env`
The `.env` file current supports the following variables:
* BUCKET: your bucket name
* BUCKET_SUBFOLDER: `[experimental!]` the folder (may be the path) to the root directory of your music files
* DEBUG: when set, various logs will surface
* AWS_ACCESS_KEY_ID: Used to configure the AWS SDK
* AWS_SECRET_ACCESS_KEY: Used to configure the AWS SDK
* PORT: The port on which to serve, defaults to `3000`

## Improvements (to-do)
* Basic password authentication on page load
* Volume control
    * `window.audio.volume`
* Next, previous buttons
* Play next track when current is finished
    * Implemented but logs `DOMException: The play() request was interrupted by a new load request.`
* Playlists 
* Allow music to be in a subfolder of the bucket
* Optimize performance with pre-loading
* Enrich UI with metadata -- album covers, artist photos, etc.