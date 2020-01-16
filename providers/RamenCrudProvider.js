const { ServiceProvider } = require('@adonisjs/fold')

class RamenCrudProvider extends ServiceProvider {
    boot() {}

    register() {
        this.app.singleton('Ramen/CrudController', (app) => {
            const RamenAuthController = require('../src/controllers/RamenCrudController')
            return RamenAuthController
        })
    }
}

module.exports = RamenCrudProvider