const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { PORT } = require('./config/serverConfig')
const sender = require('./config/emailConfig')
const setupJobs = require('./utils/job')
const TicketController = require('./controllers/ticket-controller')
const { CreateChannel,SubscribeMessage } = require('./utils/MessageQueue')
const { REMINDER_BINDING_KEY } = require("./config/serverConfig")
const EmailService = require('./services/email-service')

const startUpServer = async() => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}))
    
    app.post('/api/v1/tickets',TicketController.create)
    app.get('/api/v1/tickets',TicketController.fetchtickets)

    const channel = await CreateChannel()
    SubscribeMessage(channel,EmailService.subscribedevents,REMINDER_BINDING_KEY)

    app.listen(PORT,() => {
        console.log(`Server started at ${PORT}`);
        setupJobs()
    })

    
}


startUpServer()