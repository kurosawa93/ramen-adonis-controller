const { ServiceProvider } = require('@adonisjs/fold')

class RamenFileProvider extends ServiceProvider {
    boot() {}

    register() {
        this.app.singleton('Ramen/FileController', (app) => {
            const RamenForgotPasswordController = require('../src/controllers/RamenFileController')
            return RamenForgotPasswordController
        })
    }
}

module.exports = RamenFileProvider