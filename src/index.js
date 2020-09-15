const express = require('express')
const applyMiddleware = require('./utils').applyMiddleware
const applyROutes = require('./utils').applyRoutes
const app = express()
const AuthRoute = require('./middleware.auth')

applyMiddleware(app)
applyROutes(app)

app.listen(3001, () => {
    console.log('server is running on port 3001')
})

app.use('/api',AuthRoute)