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

    createFileStream(contentType, fileName) {
        let fileData = this.bucket.file(fileName)
        let fileStream = fileData.createWriteStream({
            metadata: {
                contentType: contentType
            },
            resumable: false,
            public: true
        })
        return fileStream
    }

    createFilename(type, name) {
        return type + '/' + Date.now() + '-' + name
    }

    getPublicUrl(filename) {
        return 'https://storage.googleapis.com/' + this.bucketName + '/' + filename
    }
}

module.exports = GoogleFileResolver