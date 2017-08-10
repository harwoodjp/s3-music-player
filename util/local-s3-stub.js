module.exports = class S3 {
    listObjectsV2() {
        return {
            promise() {
                return Promise.resolve({
                    IsTruncated: false,
                    Contents: []
                })
            }
        }
    }
}
