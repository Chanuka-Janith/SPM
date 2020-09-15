const login = require('../controllers/AuthenticateController').login


const routes = [
    {
        path: '/',
        handler: login,
        method: 'GET'
    }
]

module.exports = {routes}