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

    createFileStream(file) {
        return new Promise((resolve, reject) => {
            const fileName = this.createFilename(file.type, file.clientName)
            const contentType = file.headers['content-type']
            const fileData = this.bucket.file(fileName)
            const fileStream = fileData.createWriteStream({
                metadata: {
                    contentType: contentType
                },
                resumable: false,
                public: true
            })

            file.stream.pipe(fileStream)
            fileStream.on('error', (err) => {
                reject(err)
            })

            fileStream.on('finish', () => {
                resolve(this.getPublicUrl(fileName))
            })
        })
    }

    createFilename(type, name) {
        return type + '/' + Date.now() + '-' + name
    }

    getPublicUrl(filename) {
        return 'https://storage.googleapis.com/' + this.bucketName + '/' + filename
    }
}

module.exports = GoogleFileResolver