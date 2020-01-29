'use strict'

const FileProvider = use('Ramen/FileProvider')

class RamenFileController {
    async uploadFile({request, response}) {
        response.implicitEnd = false
        let extnames = []

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
                
                const fileName = FileProvider.createFilename(file.type, file.clientName)
                const fileStream = FileProvider.createFileStream(file.headers['content-type'], fileName)
                file.stream.pipe(fileStream)

                fileStream.on('error', (err) => {
                    response.status(500).send({
                        data: null,
                        meta: {
                            message: err
                        }
                    })
                })
        
                fileStream.on('finish', () => {
                    return response.status(200).send({
                        data: {
                            fileUrl: FileProvider.getPublicUrl(fileName)
                        },
                        meta: {
                            message: 'upload successfull'
                        }
                    })
                })
            }
        ).process()
    }
}

module.exports = RamenFileController