const isDebug = require('../../lib/isDebug')
const log = require('../../lib/log')

const AWS = require('aws-sdk')
const { promisify } = require('util')
const fs = require('fs')
const { resolve } = require('path')

const writeFile = promisify(fs.writeFile)

async function getAll({ s3, Bucket, StartAfter, previous = [] }) {
    const {
        IsTruncated,
        Contents
    } = await s3.listObjectsV2({ Bucket, StartAfter }).promise()

    ret = [...previous, ...Contents]

    if (isTruncated) {
        const lastKey = Contents.slice(-1).Key

        log(`Object list truncted at key ${lastKey}, requesting next page`)

        return getAll({ s3, Bucket, StartAfter, ret })
    }

    if (isDebug) {
        const contentsPath = resolve(__dirname, '../contents_debug.json')
        console.log(`Writing bucket contents to file at ${contentsPath}`)
        await writeFile(contentsPath, JSON.stringify(ret, undefined, 4))
    }

    return ret
}

async function listBucketObjects(shouldRefresh = false) {

}

async function getUrlArray({ awsAccessKeyId, awsSecretAccessKey, awsRegion, bucket, bucketPrefix }, knex, shouldRefresh = false) {
    
}