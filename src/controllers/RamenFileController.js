'use strict'

const FileProvider = use('Ramen/FileProvider')

class RamenFileController {
    constructor() {}

    async uploadFile({request, response}) {
        response.implicitEnd = false
        let extnames = []
        let fileName = null
        let fileStream = null

        if (request.input('extnames')) {
            extnames = request.input('extnames').split(',')
        }

        request.multipart.file(
            'file',
            {
                size: '10mb',
                extnames: extnames
            },
            async (file) => {
                await file.runValidations()
                const error = file.error()
                if (error.message) {
                    response.status(422).send({
                        data: null,
                        meta: {
                            message: error.message
                        }
                    })
                }

                fileStream = FileProvider.createFileStream(file.headers['content-type'])
                fileName = FileProvider.createFilename(file.type, file.clientName)
                file.stream.pipe(fileStream)
            }
        ).process()

        fileStream.on('error', (err) => {
            response.status(500).send({
                data: null,
                meta: {
                    message: err
                }
            })
        })

        fileStream.on('finish', () => {
            fileName = FileProvider.getPublicUrl(fileName)
            return response.status(200).send({
                data: {
                    fileUrl: fileName
                },
                meta: {
                    message: 'upload successfull'
                }
            })
        })
    }
}

module.exports = RamenFileController