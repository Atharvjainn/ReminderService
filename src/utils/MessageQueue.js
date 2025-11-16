const amqplib = require('amqplib')
const { EXCHANGE_NAME,MESSAGE_BROKER_URL} = require('../config/serverConfig')

const CreateChannel = async() => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL)
        const channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME,'direct',{durable : false})
        return channel
    } catch (error) {
        throw error
    }
}


const SubscribeMessage = async(channel,service,binding_key) => {
    try {
        const applicationqueue = await channel.assertQueue("BOOKING_SERVICE")
        channel.bindQueue(applicationqueue.queue,EXCHANGE_NAME,binding_key)
        channel.consume(applicationqueue.queue,(msg) => {
            console.log(msg.content.toString());
            const payload = JSON.parse(msg.content.toString())
            service(payload)
            channel.ack(msg)
        })
    } catch (error) {
        throw error
    }
}


const PublishMessage = async(channel,binding_key,msg) => {
    try {
        await channel.assertQueue("BOOKING_SERVICE")
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(msg))
    } catch (error) {
        throw error;
    }
}


module.exports = {
    CreateChannel,SubscribeMessage,PublishMessage
}