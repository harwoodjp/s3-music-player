## Set up
* Install and configure the AWS CLI
* Have an S3 bucket organized as follows -- `s3://[bucket-name]/[artists]/[albums]/[songs]`
* Clone project and `npm install`
* Create a file in the project root called `.env` and specify your bucket, e.g. `BUCKET=MyMusicBucket` and AWS credentials (see below for details)
* Run `npm start` and direct browser to `localhost:3000`

* Alternatively, you have serve music files from the local file system
  * Currently `mp3`, `m4a`, `aif`, `aiff`, `aifc`, `ogg`, `wav`, `flac` are supported. 
* In your `.env` set the following:
  * `LOCAL_PROVIDER_ABSOLUTE_PATH` to the absolute path of your music folder which should be arranged `[Artist]/[Album]/[Song]`
  * `LOCAL_PROVIDER_BASE_URL` to the base url or host you want to serve the files from
  * `PROVIDER` to `local`

## `.env`
The `.env` file currently supports the following variables:
* BUCKET: your bucket name
* BUCKET_SUBFOLDER: `[experimental!]` the folder (may be the path) to the root directory of your music files
* DEBUG: when set, various logs will surface and be written to the file system
* AWS_ACCESS_KEY_ID: Used to configure the AWS SDK
* AWS_SECRET_ACCESS_KEY: Used to configure the AWS SDK
* PORT: The port on which to serve, defaults to `3000`
* PROVIDER: The file provider to use. Either `s3` or `local` and defaults to `s3`
* LOCAL_PROVIDER_ABSOLUTE_PATH: For `local` provider, the aboluste path to the music directory arranged `[artist]/[album]/[song]`
* LOCAL_PROVIDER_BASE_URL: The complete base url off of which to serve the music files, defaults to `http://localhost:3000`

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
* Implement refresh cache button in UI

## Reloading the music file cache
The list of music files from s3 gets cached for speed. If you need to refresh the cache and don't wish to restart the application, send a `PUT` to `http://localhost:3000/cache` 