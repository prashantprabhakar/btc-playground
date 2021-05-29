const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const config = require('./config/config')

const platformRoutes = require('./routes')
const l = require('./utils/logger').root.child({ 'module': 'app' })

function start() {
    const app = express()

    app.use(helmet())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use('/api/v1', platformRoutes)

    app.listen(config.webport, ()=>{
      l.info(`listening on port: ${config.webport}`)
    })
}

module.exports.start = start;
