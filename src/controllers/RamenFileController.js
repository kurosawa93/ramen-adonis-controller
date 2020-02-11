'use strict'

const FileProvider = use('Ramen/FileProvider')

class RamenFileController {
    async uploadFile({request, response}) {
        response.implicitEnd = false
        let extnames = []
        const fileNames = []
        
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
                
                try {
                    const fileUrl = await FileProvider.createFileStream(file)
                    fileNames.push(fileUrl)
                }
                catch(error) {
                    response.status(500).send({
                        data: null,
                        meta: {
                            message: error.message
                        }
                    })
                }
            }
        )

        await request.multipart.process()

        let result = ''
        if (fileNames.length === 1) {
            result = fileNames[0]
        }
        else {
            for (let i = 0; i < fileNames.length; i++) {
                result += fileNames[i]

                if (i < fileNames.length-1)
                    result += ','
            }
        }
        return response.status(200).send({
            data: {
                imageUrl: result
            },
            meta: {
                message: 'Upload success'
            }
        })
    }
}

module.exports = RamenFileController