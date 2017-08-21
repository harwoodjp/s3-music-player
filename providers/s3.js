const { isDebug } = require('../util')

const AWS = require('aws-sdk')
const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const writeFile = promisify(fs.writeFile)

const {
    BUCKET,
    BUCKET_SUBFOLDER,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION
} = process.env

AWS.config.credentials.accessKeyId = AWS_ACCESS_KEY_ID
AWS.config.credentials.secretAccessKey = AWS_SECRET_ACCESS_KEY
AWS.config.region = AWS_REGION

const s3 = new AWS.S3()

let data = {
    bucketObjects: null,
    urlArray: null
}

async function getAll(Bucket = BUCKET, StartAfter = undefined, previous = []) {
    const {
        IsTruncated,
        Contents
    } = await s3.listObjectsV2({ Bucket, StartAfter }).promise()

    ret = [...previous, ...Contents]

    if (IsTruncated) {
        const lastKey = Contents[Contents.length - 1].Key

        if (isDebug) console.log(`Object list truncated at key ${lastKey}, requesting next page`)
        
        return getAll(Bucket, lastKey, ret)
    }

    if (isDebug) {
        const contentsPath = resolve(__dirname, '../contents_debug.json')
        console.log(`Writing bucket contents to file at ${contentsPath}`)
        await writeFile(contentsPath, JSON.stringify(ret, undefined, 4))
    }

    return ret
}

async function listBucketObjects(shouldRefresh = false) {
    if (data.bucketObjects === null || shouldRefresh) {
        if (isDebug) console.log(`Getting bucket objects (s3.listObjects({ Bucket: ${BUCKET} })`)
        
        data.bucketObjects = await getAll()

        return data.bucketObjects
    }

    if (isDebug) console.log('Using cached bucket objects')
    return data.bucketObjects
}

async function getUrlArray(shouldRefresh = false) {
    if (data.urlArray !== null && !shouldRefresh) {
        if (isDebug) console.log('Using cached bucket object http access url array')
        
        return data.urlArray
    }

    if (isDebug) console.log('Getting bucket object http access url array')
    
    const bucketObjects = await listBucketObjects(shouldRefresh)

    if (isDebug) console.log(bucketObjects)

    const bucketUrlRoot = `https://s3.amazonaws.com/${BUCKET}`

    data.urlArray = bucketObjects.reduce((acc, curr) => curr.Key && curr.Key.endsWith('mp3') ?
        [...acc, `${bucketUrlRoot}/${curr.Key}`] :
        acc
    , [])

    return data.urlArray
}

module.exports = getUrlArray