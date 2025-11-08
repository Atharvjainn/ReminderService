const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { PORT } = require('./config/serverConfig')
const sender = require('./config/emailConfig')
const sendBasicEmail = require('./services/email-service')

const startUpServer = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}))

    app.listen(PORT,() => {
        console.log(`Server started at ${PORT}`);
        sendBasicEmail("lenovoservicecenterr@gmail.com","lenovoservicecenterr@gmail.com","Random mail","Hi, hope you are doing well")
    })
}


startUpServer()