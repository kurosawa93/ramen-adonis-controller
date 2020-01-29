'use strict'

const { Storage } = require('@google-cloud/storage')
const Helpers = use('Helpers')

class GoogleFileResolver {
    constructor(options) {
        const credentialsKey = Helpers.appRoot() + '/' + options.credentialsKey
        const storage = new Storage({
            projectId : options.projectId,
            keyFilename: credentialsKey
        })
        this.bucketName = options.bucketName
        this.bucket = storage.bucket(this.bucketName)
    }

    static createFileStream(contentType) {
        let fileData = this.bucket.file(objectName)
        let fileStream = fileData.createWriteStream({
            metadata: {
                contentType: contentType
            },
            resumable: false,
            public: true
        })
        return fileStream
    }

    static createFileName(type, name) {
        return type + '/' + Date.now() + '-' + name
    }

    static getPublicUrl(filename) {
        return 'https://storage.googleapis.com/' + this.bucketName + '/' + filename
    }
}

module.exports = GoogleFileResolver