## Set up
* Install and configure the AWS CLI
* Have an S3 bucket organized as follows -- `s3://[bucket-name]/[artists]/[albums]/[songs]`
* Clone project and `npm install`
* Create a file in the project root called `.env` and specify your bucket, e.g. `BUCKET=MyMusicBucket`
* Run `node index.js` and direct browser to `localhost:3000`

## Improvements (to-do)
* Allow users to pass in their own AWS keys, instead of reading from `~/.aws/credentials`
* Basic password authentication on page load
* Volume control
    * `window.audio.volume`
* Next, previous buttons
* Play next track when current is finished
    * Implemented but logs `DOMException: The play() request was interrupted by a new load request.`
* Playlists 
* Optimize performance with pre-loading
* Enrich UI with metadata -- album covers, artist photos, etc.