## Set up
* Install and configure the AWS CLI
* Have an S3 bucket organized like this -- `s3://[bucket-name]/[artists]/[albums]/[song]`
* Clone project and `npm install`
* Create a file in the project root called `.env` and specify your bucket, e.g. `BUCKET=MyMusicBucket`
* Run `node index.js` and direct browser to `localhost:3000`

## Improvements (to-do)
* Allow users to pass in their own AWS keys, instead of reading from `~/.aws/credentials`
* Volume control
    * `window.audio.volume`
* Next, previous, track length and progress
    * `window.audio.currentTime`
    * `window.audio.duration`
* Improve search efficiency  
