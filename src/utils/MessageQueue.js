const amqplib = require('amqplib')


const CreateChannel = async() => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL)
        const channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME,'direct',false)
    } catch (error) {
        throw error
    }
}


const SubscribeMessage = async(channel,service,binding_key) => {
    try {
        const applicationqueue = await channel.assertQueue(QUEUE_NAME)
        channel.bindQueue(applicationqueue.queue,EXCHANGE_NAME,binding_key)
        channel.consume(applicationqueue.queue,queue,message => {
            console.log(message.content.toString());
            channel.ack(message)
        })
    } catch (error) {
        throw error
    }
}


const PublishMessage = async() => {
    try {
        await channel.assertQueue(QUEUE_NAME)
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message))
    } catch (error) {
        throw error;
    }
}


module.exports = {
    CreateChannel,SubscribeMessage,PublishMessage
}